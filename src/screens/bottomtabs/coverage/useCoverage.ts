import {useState, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ApiRequest from '../../../services/api/ApiRequest';
import ApiRoutes from '../../../services/config/ApiRoutes';
import {RootState} from '../../../services/redux/store';
import {setReels} from '../../../services/redux/slices/reelSlice';

const useCoverage = () => {
  const token = useSelector((state: RootState) => state?.UserData?.token);
  const [allShortsLoading, setAllShortsLoading] = useState(false);
  const reels = useSelector((state: RootState) => state.reels.reels);

  const [allShorts, setAllShorts] = useState<any[]>(reels || []);
  const dispatch = useDispatch();

  // 🔹 useCallback prevents unnecessary re-creation of the function
  const getAllShorts = useCallback(async () => {
    if (!token) return; // safety: don't call without token
    try {
      setAllShortsLoading(true);

      const response = await ApiRequest({
        BaseUrl: ApiRoutes.getAllShorts,
        method: 'GET',
        token:token,
      });

      if (response?.status === 200 || response?.status === 201) {
        dispatch(setReels(response.data));
        setAllShorts(reels);
      } else {
        console.warn('Unexpected status:', response?.status);
        setAllShorts([]);
      }
    } catch (error: any) {
      setAllShorts([]);
      console.error('Coverage API Error:', error?.message || error);
    } finally {
      setAllShortsLoading(false);
    }
  }, [token]);

  return {
    allShortsLoading,
    allShorts,
    getAllShorts,
    reels,
  };
};

export default useCoverage;
