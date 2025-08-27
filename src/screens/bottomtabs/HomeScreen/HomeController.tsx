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

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [Categoryloading, setCategoryLoading] = useState(false);
  const [allCategory, setAllCategory] = useState([]);
  const [allNeewsLoading, setAllNeewsLoading] = useState(true);
  const [allNeews, setAllNeews] = useState([]);
  const [allHeadings, setAllHeadings] = useState([]);
  const {sizes, fontFamily} = useFontSize();
  const {colors, mode} = useTheme();
  const {t} = useLanguage();
  const userData = useSelector(state => state);
  const [pollData, setPollData] = useState([]);
  const [polldataloading, setPolDataLoading] = useState(true);

  // console.log('--------------------------', allNeews);

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
    try {
      const response = await ApiRequest({
        BaseUrl: ApiRoutes.getAllheadlines,
        method: 'GET',
      });
      if (response?.success) {
        setAllHeadings(response?.data);
      } else {
        setAllHeadings([]);
      }
    } catch (error: any) {
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
    t,
    filteredNews,
    allCategory,
    allNeews,
    setSelectedCategory,
    Categoryloading,
    allNeewsLoading,
    allHeadings,
    pollData,
    polldataloading,
  };
};

export default HomeController;
