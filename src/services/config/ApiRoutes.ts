import AppContant from './AppContant';

export default {
  login: AppContant.BaseUrl + 'api/v1/user/login', //-----------Complete
  signup: AppContant.BaseUrl + 'api/v1/user/signup',
  newCategory: AppContant.BaseUrl + 'api/v1/user/categories', //-----------Complete
  getAllNews: AppContant.BaseUrl + 'api/v1/user/news', //-----------Complete
  likeNews: AppContant.BaseUrl + '/products',
  forgotPassword: AppContant.BaseUrl + '/products',
  getAllheadlines: AppContant.BaseUrl + 'api/v1/user/headline', //-----------Complete
  getAllShorts: AppContant.BaseUrl + 'api/v1/user/shorts', //-----------Complete
  getpostCommentByShortId:
    AppContant.BaseUrl + 'api/v1/user/shorts/:shortId/comment',
};
