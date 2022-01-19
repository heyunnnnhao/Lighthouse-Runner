import { get, mergeWith, isNumber } from 'lodash';
import { LighthouseResponse, LighthouseRaw } from './interfaces';
import { getStandardDeviation, getAverage } from './utils';

// 计算得分
function getScore(list: Array<any>): number {
  let temp = 0;

  list.forEach((i) => {
    if (i.weight && i.score) {
      temp += i.weight * i.score;
    }
  });

  let realScore = Math.ceil(temp);

  let fakeScore = realScore;

  // if (curveRatio) fakeScore *= curveRatio;

  if (fakeScore > 100) return 100;

  if (fakeScore < 1) throw Error('分数太低了!!!');

  return +fakeScore;
}

// 动态忽略个数
function getOmitCount(length: number): number {
  // 过滤promise失败后的列表若只剩一项，不忽略
  if (length === 1) return 0;
  // 8不是必须，目的是跑分8次以上的话忽略最低的两次
  return Math.ceil(length / 8);
}

// 多次跑分中忽略最低的x次
function adjustResponse(validList: Array<LighthouseResponse>, omitCount: number): Array<LighthouseResponse> {
  return validList
    .sort((a, b) => {
      return a.score.value - b.score.value;
    })
    .slice(omitCount);
}

// 多次跑分后合并结果
export function mergeResponses(validList: Array<LighthouseResponse>, times: number): LighthouseResponse {
  let result: any = {};

  const omitCount = getOmitCount(validList.length);

  const scoreList = validList.map((i) => i.score.value);

  const adjustedValidList = adjustResponse(validList, omitCount);

  const adjustedScoreList = adjustedValidList.map((i) => i.score.value);
  // 如果忽略最低次后有效跑分只剩一次，则直接取用之
  if (adjustedValidList.length > 1) {
    // 自定义合并函数用于 lodash.mergeWith
    const merger = (value1: any, value2: any): number | undefined => {
      if (isNumber(value1)) {
        // 个别检查项目结果为二进制，若欲合并的两次结果不同，则使用 OR 门
        if ((value1 === 1 || value1 === 0) && value1 + value2 === 1) return 1;
        return (value1 + value2) / 2;
      }
    };

    for (let i = 0; i < adjustedValidList.length - 1; i++) {
      if (Object.keys(result).length === 0) {
        // 首次循环
        result = mergeWith(adjustedValidList[0], adjustedValidList[1], merger);
      } else {
        result = mergeWith(result, adjustedValidList[i + 1], merger);
      }
    }
  } else if (adjustedValidList.length === 1) {
    result = adjustedValidList[0];
  }

  // 修正时区
  result.fetchTime = new Date(result.fetchTime);
  // 跑分次数
  result.timesRun = times;
  // 跑分成功次数
  result.successfulRun = validList.length;
  // 分数相关数据
  result.score = {
    // 得分
    value: Math.ceil(getAverage(adjustedScoreList)),
    // 未经忽略的得分
    valueBeforeOmit: Math.ceil(getAverage(scoreList)),
    // 忽略最低次后的得分标准差
    standardDeviation: getStandardDeviation(adjustedScoreList),
    // 未经忽略的所有得分的标准差
    standardDeviationBeforeOmit: getStandardDeviation(scoreList),
    // 未经忽略的所有跑分得分
    allScore: scoreList,
    // 忽略掉的跑分次数
    omittedRun: omitCount,
  };
  // 描述性文字
  result.description = `${validList.length} / ${times} runs ha${validList.length === 1 ? 's' : 've'} passed with the score of ${result.score.value}`;
  
  return result;
}

// 整理，重组lighthouse返回的原始数据
export function formatLighthouseResponse(rawData: LighthouseRaw): LighthouseResponse {
  const lhr: any = get(rawData, 'lhr', {});

  const auditRefs: any = get(lhr, 'categories.performance.auditRefs');

  let msr: any = lhr.audits; // msr 为 "MenShen result"

  // 为 检查项目 列表添加权重和group名
  auditRefs.forEach((i: any) => {
    msr[i.id].weight = i.weight;
    msr[i.id].group = i.group;
  });

  // 过滤无权重（0也算有权重）的检查项目
  msr = Object.values(msr).filter((i: any) => i.weight != undefined);

  const score = getScore(msr);
  // Lighthouse 返回的总结果在此定义
  const result: LighthouseResponse = {
    score: {
      value: score,
      valueBeforeOmit: score,
      standardDeviation: 0,
      standardDeviationBeforeOmit: 0,
      allScore: null,
      omittedRuns: 0,
    },
    //描述性文字
    description: null,
    // 跑分次数
    timesRun: 1,
    // 跑分成功次数
    successfulRun: 1,
    // Lighthouse 版本
    lighthouseVersion: lhr.lighthouseVersion,
    // 请求url
    requestURL: lhr.requestedUrl,
    // 重定向后url
    finalUrl: lhr.finalUrl,
    // 请求时间
    fetchTime: lhr.fetchTime,
    // UA
    userAgent: lhr.userAgent,
    // 环境参数
    environment: lhr.environment,
    // 性能，网络节流参数
    throttling: lhr.configSettings.throttling,
    // 手机环境模拟参数
    emulation: lhr.configSettings.screenEmulation,
    // 各检查项目结果
    msr,
  };

  return result;
}
