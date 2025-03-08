
import request from '../request'
import axios from 'axios'

export function getItemTooltipHtml(itemId: number) {
  return axios.get('https://open.damijing.com/api/tooltip/item/' + itemId)
}