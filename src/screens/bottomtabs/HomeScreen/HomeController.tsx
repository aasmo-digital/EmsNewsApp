import {View, Text} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {useFontSize} from '../../../context/FontSizeContext';
import {useTheme} from '../../../context/ThemeContext';
import {useLanguage} from '../../../context/LanguageContext';
import {categories, newsData} from './const';
import ApiRequest from '../../../services/api/ApiRequest';
import ApiRoutes from '../../../services/config/ApiRoutes';
import {useFocusEffect} from '@react-navigation/native';
import {useSelector} from 'react-redux';

const HomeController = () => {
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
      if (response) {
        // console.log(
        //   '------------getAllCategory--',
        //   JSON.stringify(response?.data),
        // );

        setCategoryLoading(false);
        setAllCategory(response?.data);
      } else {
        setCategoryLoading(false);
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
      if (response) {
        // console.log(
        //   '------------getAllNews--',
        //   JSON.stringify(response?.data[0]),
        // );

        setAllNeewsLoading(false);
        setAllNeews(response?.data);
      } else {
        setAllNeewsLoading(false);
      }
    } catch (error: any) {
      setAllNeewsLoading(false);
      console.error(' Error:', error.message);
    }
  };

  // 🔁 getAllCategory Call
  const getAllHeadlines = async () => {
    // setAllNeewsLoading(true);
    try {
      const response = await ApiRequest({
        BaseUrl: ApiRoutes.getAllheadlines,
        method: 'GET',
      });
      if (response) {
        // console.log('------------getAllHeadlines--', response?.data);
        setAllHeadings(response?.data);
        // setAllNeewsLoading(false);
        // setAllNeews(newsData);
      } else {
        // setAllNeewsLoading(false);
      }
    } catch (error: any) {
      // setAllNeewsLoading(false);
      console.error(' Error:', error.message);
    }
  };

  useEffect(() => {
    getAllCategory();
    getAllNews();
    getAllHeadlines();
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
  };
};

export default HomeController;
