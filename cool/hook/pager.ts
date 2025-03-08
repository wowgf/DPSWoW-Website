import { reactive, ref } from "vue"
type LoadingStatus = 'loading' | 'loadmore' | 'nomore'; // 加载状态 loading-加载中 loadmore-加载更多 nomore-没有更多数据

interface Res {
  list: any[];
  pagination: {
    page: number;
    size: number;
    total: number;
  }
}
export function usePage(refresh: (params: any) => void, pageOpt?: { page?: number, size?: number, longList?: boolean, keepEmpty?: boolean }) {
  // 初始化当前页列表数据和加载状态
  const list = ref<any>([]); // 当前页列表数据
  const loadingStatus = ref<LoadingStatus>('loading');

  const pagination = reactive({
    page: pageOpt?.page || 1,
    size: pageOpt?.size || 20,
    total: 0
  })

  const isLoading = () => loadingStatus.value === 'loading';

  /**
   * 执行数据获取操作，并处理获取后的数据和状态更新。
   * @param fetch 一个接受参数并返回Promise的函数，用于执行数据获取操作。
   * @param params 传递给fetch函数的参数对象。
   * @returns 返回一个对象，包含一个用于结束加载状态的done函数和当前传递给fetch函数的参数数据。
   */
  async function onFetch(fetch: (requestParams: any) => Promise<any>, params: any) {
    // 合并分页信息和传入的参数
    let data = {
      ...pagination,
      ...params
    }

    // 清除空值
    if (!pageOpt?.keepEmpty) {
      data = clearEmpty(data)
    }

    if (data.page == 1) list.value = []
    loadingStatus.value = 'loading'; // 更新加载状态为"loading"
    delete data.total
    // 执行数据获取，更新列表和分页信息，根据返回结果控制加载状态
    await fetch(data).then((res: Res) => {
      if (pageOpt?.longList) {
        list.value = list.value.concat(res.list)
      } else {
        list.value = res.list
      }
      // 更新分页信息
      Object.assign(pagination, res.pagination)
      // 根据返回数据的总数和当前页数判断是否已完成加载
      done(res.pagination.total <= res.pagination.page * res.pagination.size)
    }).catch((error) => {
      console.error("Fetching data failed:", error);
      loadingStatus.value = 'nomore';
      // 在此处根据实际情况处理错误，例如设置错误信息或重试逻辑
    });

    /**
     * 结束请求
     * 根据传入的isFinish参数决定是结束加载（设置为'nomore'）还是继续加载（设置为'loadmore'）。
     * @param isFinish 指示是否完成加载的布尔值。如果为true，则将加载状态设置为'nomore'；如果为false，则设置为'loadmore'。
     *                 此参数为可选，默认为false。
     */
    function done(isFinish?: boolean) {
      // 更新加载状态
      loadingStatus.value = isFinish ? 'nomore' : 'loadmore';
    }

    return {
      done,
      data
    }
  }

  /**
   * 用于加载写一页数据
   * 当当前加载状态为"loadmore"时，更新状态为"loading"，增加页码，并触发刷新操作。
   * 注意：此函数不接受参数，也不返回任何值。
   */
  function loadNext() {
    // 当加载状态为"loadmore"时，进行加载更多数据的操作
    if (loadingStatus.value === 'loadmore') {
      pagination.page++; // 增加当前页码
      refresh({
        page: pagination.page // 刷新数据，使用新的页码
      })
    }
  }

  /**
   * 加载上一页数据
   */
  function loadPrev() {
    if (pagination.page > 1) {
      pagination.page--;
      refresh({
        page: pagination.page
      })
    }
  }

  function currentChange(page?: number) {
    if (page && typeof page == 'number') pagination.page = page;
    refresh({
      page: pagination.page
    })
  }

  function loadmore() {
    console.log('loadmore');

    if (loadingStatus.value === 'loadmore') {
      pagination.page++;
      refresh({
        page: pagination.page
      })
    }
  }

  /**
   * 删除查询条件中的空值 null undefined ''，并返回新的查询条件对象。
   */
  function clearEmpty(params: any) {
    const newParams: any = {};
    for (const key in params) {
      if (params[key] !== null && params[key] !== undefined && params[key] !== '') {
        newParams[key] = params[key];
      }
    }
    return newParams;
  }

  return {
    list: list,
    loadingStatus: loadingStatus,
    pagination,
    onFetch,
    loadNext,
    loadPrev,
    isLoading,
    currentChange,
    loadmore
  }
}
