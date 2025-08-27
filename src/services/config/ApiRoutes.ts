import AppContant from './AppContant';

export default {
  login: AppContant.BaseUrl + 'api/v1/user/login', //-----------Complete
  signup: AppContant.BaseUrl + 'api/v1/user/register', //-----------Complete
  newCategory: AppContant.BaseUrl + 'api/v1/user/categories', //-----------Complete
  getAllNews: AppContant.BaseUrl + 'api/v1/user/news', //-----------Complete
  getNewsById: AppContant.BaseUrl + 'api/v1/user/new/', //-----------Pending
  getAllEmsVideos: AppContant.BaseUrl + 'api/v1/user/videos', //-----------Complete
  addLikeNews: AppContant.BaseUrl + 'api/v1/user/news',
  // forgotPassword: AppContant.BaseUrl + '/products',
  getAllheadlines: AppContant.BaseUrl + 'api/v1/user/headline', //-----------Complete
  getAllShorts: AppContant.BaseUrl + 'api/v1/user/shorts', //-----------Complete
  likeDislikeShorts: AppContant.BaseUrl + 'api/v1/user/shorts/{{shortId}}/like',
  getpostCommentByShortId:
    AppContant.BaseUrl + 'api/v1/user/shorts/:shortId/comment',

  getAllCountries: AppContant.BaseUrl + 'api/v1/user/countries', //-----------Complete
  getStatesByCountryId: AppContant.BaseUrl + 'api/v1/user/countries/', //-----------Complete
  getCitiesByStateId: AppContant.BaseUrl + 'api/v1/user/states/', //-----------Complete
  getAllPolls: AppContant.BaseUrl + 'api/v1/user/polls', //-----------Complete
  voteOnPoll: AppContant.BaseUrl + 'api/v1/user/polls/',
  // getPollById: AppContant.BaseUrl + 'api/polls/:id',
};
