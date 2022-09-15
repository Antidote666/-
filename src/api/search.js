import request from '@/utils/request'

export const getSuggestions = (q) => {
  return request({
    url: '/v1_0/suggestion',
    params: {
      q
    }
  })
}

export const getResult = (page, perpage, q) => {
  return request({
    url: '/v1_0/search',
    params: {
      page,
      per_page: perpage,
      q
    }
  })
}
