import AppContant from './AppContant';

export default {
  login: AppContant.BaseUrl + 'api/v1/user/login', //-----------Complete
  signup: AppContant.BaseUrl + 'api/v1/user/register', //-----------Complete
  getProfileById: AppContant.BaseUrl + 'api/v1/user/profile', //-----------Complete
  newCategory: AppContant.BaseUrl + 'api/v1/user/categories', //-----------Complete
  getAllNews: AppContant.BaseUrl + 'api/v1/user/newsByUser', //-----------Complete
  getNewsById: AppContant.BaseUrl + 'api/v1/user/new/', //-----------Pending
  getAllEmsVideos: AppContant.BaseUrl + 'api/v1/user/videos', //-----------Complete
  addLikeNews: AppContant.BaseUrl + 'api/v1/user/news', //-----------Complete
  getAllheadlines: AppContant.BaseUrl + 'api/v1/user/headline', //-----------Complete
  getAllShorts: AppContant.BaseUrl + 'api/v1/user/shorts', //-----------Complete
  likeDislikeShorts: AppContant.BaseUrl + 'api/v1/user/shorts/', //-----------Complete
  getpostCommentByShortId: AppContant.BaseUrl + 'api/v1/user/shorts/', //-----------Complete
  getAllCountries: AppContant.BaseUrl + 'api/v1/user/countries', //-----------Complete
  getStatesByCountryId: AppContant.BaseUrl + 'api/v1/user/countries/', //-----------Complete
  getCitiesByStateId: AppContant.BaseUrl + 'api/v1/user/states/', //-----------Complete
  getAllPolls: AppContant.BaseUrl + 'api/v1/user/polls', //-----------Complete
  voteOnPoll: AppContant.BaseUrl + 'api/v1/user/polls/',
  addNewsComment: AppContant.BaseUrl + 'api/v1/user/news/', //-----------Complete
  getCommentByNewsId: AppContant.BaseUrl + 'api/v1/user/comment/', //-----------Complete
  // getPollById: AppContant.BaseUrl + 'api/polls/:id',
  addremoveWishList: AppContant.BaseUrl + 'api/v1/user/savedNews/', //-----------Complete
  getAllWishList: AppContant.BaseUrl + 'api/v1/user/savedNews', //-----------Complete
};
