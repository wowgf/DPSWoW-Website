import axios from "axios";
import type { PotionOption } from "~/types/option"

export function useGear() {

  const selectOptions = reactive({
    foods: <PotionOption[]>[],
    flasks: <PotionOption[]>[],
    potions: <PotionOption[]>[],
    augmentationRunes: <PotionOption[]>[],
    weaponRunes: <PotionOption[]>[],
  })

  initSelectOptions();

  /**
   * 初始化选择项
   */
  function initSelectOptions() {
    axios
      .get(
        "/wow/data/potions_cn.json"
      )
      .then((res) => {
        selectOptions.potions = res.data;
      });
    axios
      .get(
        "/wow/data/foods_cn.json"
      )
      .then((res) => {
        selectOptions.foods = res.data;
      });
    axios
      .get(
        "/wow/data/flasks_cn.json"
      )
      .then((res) => {
        selectOptions.flasks = res.data;
      });
    axios
      .get(
        "/wow/data/augments_cn.json"
      )
      .then((res) => {
        selectOptions.augmentationRunes = res.data;
      });
    axios
      .get(
        "/wow/data/weapon_rune_cn.json"
      )
      .then((res) => {
        selectOptions.weaponRunes = res.data;
      });
  }

  

  return {
    initSelectOptions,
    selectOptions
  }
}