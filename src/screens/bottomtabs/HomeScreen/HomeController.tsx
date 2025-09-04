import {View, Text} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {useFontSize} from '../../../context/FontSizeContext';
import {useTheme} from '../../../context/ThemeContext';
import {useLanguage} from '../../../context/LanguageContext';
import {categories, newsData} from './const';
import ApiRequest from '../../../services/api/ApiRequest';
import ApiRoutes from '../../../services/config/ApiRoutes';
import {useFocusEffect} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../../services/redux/store';
import {fetchNews} from '../../../services/redux/slices/NewsSlice';
import {setNews} from '../../../services/redux/slices/newsSlice';
import {setNewsCategory} from '../../../services/redux/slices/newCategorySlice';

const HomeController = () => {
  // const dispatch = useDispatch<AppDispatch>();
  // const {news, loading, error} = useSelector(
  //   (state: RootState) => state.NewsData,
  // );
  // useEffect(() => {
  //   dispatch(fetchNews());
  // }, [dispatch]);

  // console.log('=======', news, loading, error);

  const token = useSelector(state => state.UserData?.token);
  // const userData = useSelector(state => state);

  const {sizes, fontFamily} = useFontSize();
  const {colors, mode} = useTheme();
  const {t} = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [allCategory, setAllCategory] = useState([]);
  const [Categoryloading, setCategoryLoading] = useState(false);
  const [allNeews, setAllNeews] = useState([]);
  const [allNeewsLoading, setAllNeewsLoading] = useState(true);
  const [allHeadings, setAllHeadings] = useState([]);
  const [allHeadingsLoading, setAllHeadingsLoading] = useState(false);
  const [pollData, setPollData] = useState([]);
  const [polldataloading, setPolDataLoading] = useState(true);

  const dispatch = useDispatch();
  const news = useSelector((state: RootState) => state.news.news);

  // console.log('-----------------news---------', news);

  const filteredNews = selectedCategory
    ? allNeews.filter(item => item?.category?.id === selectedCategory)
    : allNeews;

  // 🔁 getAllCategory Call
  const getAllCategory = async () => {
    setCategoryLoading(true);
    try {
      const response = await ApiRequest({
        BaseUrl: ApiRoutes.newCategory,
        method: 'GET',
      });
      if (response?.success) {
        setCategoryLoading(false);
        dispatch(setNewsCategory(response?.data));
        setAllCategory(response?.data);
      } else {
        setCategoryLoading(false);
        setAllCategory([]);
      }
    } catch (error: any) {
      setCategoryLoading(false);
      console.error(' Error:', error.message);
    }
  };

  // 🔁 getAllCategory Call
  const getAllNews = async () => {
    setAllNeewsLoading(true);
    try {
      const response = await ApiRequest({
        BaseUrl: ApiRoutes.getAllNews,
        method: 'GET',
      });
      if (response?.success) {
        setAllNeewsLoading(false);
        dispatch(setNews(response?.data));
        setAllNeews(response?.data);
      } else {
        setAllNeewsLoading(false);
        setAllNeews([]);
      }
    } catch (error: any) {
      setAllNeewsLoading(false);
      console.error(' Error:', error.message);
    }
  };

  // 🔁 getAllCategory Call
  const getAllHeadlines = async () => {
    setAllHeadingsLoading(true);
    try {
      const response = await ApiRequest({
        BaseUrl: ApiRoutes.getAllheadlines,
        method: 'GET',
      });
      if (response?.success) {
        setAllHeadingsLoading(false);
        setAllHeadings(response?.data);
      } else {
        setAllHeadingsLoading(false);
        setAllHeadings([]);
      }
    } catch (error: any) {
      setAllHeadingsLoading(false);
      console.error(' Error:', error.message);
    }
  };

  // 🔁 getAllCategory Call
  const getAllPolls = async () => {
    setPolDataLoading(true);
    try {
      const response = await ApiRequest({
        BaseUrl: ApiRoutes.getAllPolls,
        method: 'GET',
        token: token,
      });

      if (response?.success) {
        setPolDataLoading(false);
        console.log('----getAllPolls-----', JSON.stringify(response?.data));
        setPollData(response?.data);
      } else {
        setPolDataLoading(false);
        setPollData([]);
      }
    } catch (error: any) {
      setPolDataLoading(false);
      console.error('getAllPolls Error:', error.message);
    }
  };

  useEffect(() => {
    getAllCategory();
    getAllNews();
    getAllHeadlines();
    getAllPolls();
  }, []);

  // useFocusEffect(
  //   useCallback(() => {
  //     getAllCategory();
  //     getAllNews();

  //     // Agar cleanup chahiye to return function
  //     return () => {
  //       console.log('Screen unfocused - cleanup if needed');
  //     };
  //   }, []),
  // );

  return {
    selectedCategory,
    sizes,
    fontFamily,
    colors,
    mode,
    t,
    filteredNews,
    allCategory,
    allNeews,
    setSelectedCategory,
    Categoryloading,
    allNeewsLoading,
    allHeadings,
    allHeadingsLoading,
    pollData,
    polldataloading,
  };
};

export default HomeController;
