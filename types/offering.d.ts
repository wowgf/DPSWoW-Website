export interface OfferingDTO {
  categoryId?: number;
  /**
   * 描述
   */
  description?: string;
  /**
   * 详情（富文本）
   */
  detail?: string;
  /**
   * 图片数组 第一张是首图
   */
  images: string[];
  price?: number;
  /**
   * 状态 0-暂存（未发布）1-已发布 2-已完成 11-封禁（只显示不可选）
   */
  status?: number;
  /**
   * 标签数组
   */
  tags?: string[];
  title: string;
  [property: string]: any;
}