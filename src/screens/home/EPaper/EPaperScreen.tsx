import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
  Modal,
  FlatList,
  SafeAreaView,
  Alert,
} from 'react-native';
import React, {useState, useRef} from 'react';
import Pdf from 'react-native-pdf';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {HeaderCompt, PageContainer} from '../../../components/componentsIndex';
import {useFontSize} from '../../../context/FontSizeContext';
import {useTheme} from '../../../context/ThemeContext';
import {useLanguage} from '../../../context/LanguageContext';

const DUMMY_EPAPER = {
  id: '2023-10-27',
  date: 'October 27, 2023',
  pdfUrl:
    'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
};

const {width, height} = Dimensions.get('window');

const EPaperScreen = ({navigation}) => {
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isGalleryVisible, setGalleryVisible] = useState(false);
  const pdfRef = useRef(null);
  const {sizes, fontFamily} = useFontSize();
  const {colors, mode} = useTheme();
  const {t} = useLanguage();

  const source = {
    uri: DUMMY_EPAPER.pdfUrl,
    cache: true,
  };

  const goToPage = pageNumber => {
    pdfRef.current.setPage(pageNumber);
    setGalleryVisible(false);
  };

  // Generate data for the gallery FlatList (e.g., [1, 2, 3, ...])
  const galleryPages = Array.from({length: totalPages}, (_, i) => i + 1);

  return (
    <PageContainer>
      <SafeAreaView style={styles.container}>
        <HeaderCompt title={t('epaper_text')} />

        <View style={styles.pdfContainer}>
          <Pdf
            ref={pdfRef}
            source={source}
            trustAllCerts={false} // For Android; use true if you have SSL issues with self-signed certs
            onLoadComplete={(numberOfPages, filePath) => {
              setTotalPages(numberOfPages);
              setIsLoading(false);
            }}
            onPageChanged={(page, numberOfPages) => {
              setCurrentPage(page);
            }}
            onError={error => {
              console.log(error);
              setIsLoading(false);
              Alert.alert('Could not load e-paper.');
            }}
            onPressLink={uri => {
              console.log(`Link pressed: ${uri}`);
            }}
            style={styles.pdf}
            horizontal
          />
          {isLoading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#007bff" />
              <Text style={styles.loadingText}>Loading E-Paper...</Text>
            </View>
          )}
        </View>

        <View style={styles.footer}>
          <Text style={styles.pageInfoText}>
            Page {currentPage} of {totalPages}
          </Text>
          <TouchableOpacity
            style={styles.galleryButton}
            onPress={() => setGalleryVisible(true)}>
            <Ionicons name="grid-outline" size={24} color="#007bff" />
            <Text style={styles.galleryButtonText}>Pages</Text>
          </TouchableOpacity>
        </View>

        <Modal
          animationType="slide"
          transparent={false}
          visible={isGalleryVisible}
          onRequestClose={() => setGalleryVisible(false)}>
          <SafeAreaView style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>All Pages</Text>
              <TouchableOpacity onPress={() => setGalleryVisible(false)}>
                <Ionicons name="close" size={32} color="#333" />
              </TouchableOpacity>
            </View>
            <FlatList
              data={galleryPages}
              keyExtractor={item => item.toString()}
              numColumns={3}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={styles.thumbnail}
                  onPress={() => goToPage(item)}>
                  <View style={styles.thumbnailContent}>
                    <Text style={styles.thumbnailText}>{item}</Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          </SafeAreaView>
        </Modal>
      </SafeAreaView>
    </PageContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  pdfContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pdf: {
    flex: 1,
    width: width,
    height: height,
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  pageInfoText: {
    fontSize: 16,
    color: '#555',
  },
  galleryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#eef',
  },
  galleryButtonText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
    color: '#007bff',
  },
  // Modal Styles
  modalContainer: {
    flex: 1,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  thumbnail: {
    flex: 1 / 3,
    aspectRatio: 0.7, // Portrait aspect ratio for thumbnails
    padding: 8,
  },
  thumbnailContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  thumbnailText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#555',
  },
});

export default EPaperScreen;
