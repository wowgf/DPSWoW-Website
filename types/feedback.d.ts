export interface FeedbackDTO {
  /**
   * 联系方式
   */
  contact?: string;
  /**
   * 反馈内容
   */
  content: string;
  [property: string]: any;
}