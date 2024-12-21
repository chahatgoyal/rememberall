import React, { useState, useRef } from 'react';
import { 
  View, 
  StyleSheet, 
  ScrollView, 
  Dimensions, 
  NativeSyntheticEvent,
  NativeScrollEvent
} from 'react-native';
import { Text, Card, useTheme } from 'react-native-paper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';


const { width } = Dimensions.get('window');

interface PageIndicatorProps {
  totalDots: number;
  currentIndex: number;
}

interface PageProps {
  title: string;
  items: Array<{
    label: string;
    value: string;
  }>;
}

// Page Indicator Component
const PageIndicator: React.FC<PageIndicatorProps> = ({ totalDots, currentIndex }) => {
  const theme = useTheme();

  return (
    <View style={styles.indicatorContainer}>
      {[...Array(totalDots)].map((_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            {
              backgroundColor: index === currentIndex 
                ? theme.colors.primary 
                : theme.colors.surfaceVariant,
              width: index === currentIndex ? 24 : 8,
            }
          ]}
        />
      ))}
    </View>
  );
};

// Generic Page Component
const PageContent: React.FC<PageProps> = ({ title, items }) => (
  <Card style={styles.pageCard}>
    <Card.Content>
      <Text variant="headlineMedium">{title}</Text>
      <View style={styles.formContainer}>
        {items.map((item, index) => (
          <Text key={index} variant="bodyLarge">
            {item.label}: {item.value}
          </Text>
        ))}
      </View>
    </Card.Content>
  </Card>
);

// Page Data
const pageData: Array<PageProps> = [
  {
    title: "Personal Info",
    items: [
      { label: "Name", value: "John Doe" },
      { label: "Email", value: "john@example.com" },
      { label: "Phone", value: "(555) 123-4567" }
    ]
  },
  {
    title: "Preferences",
    items: [
      { label: "Theme", value: "Dark" },
      { label: "Notifications", value: "Enabled" },
      { label: "Language", value: "English" }
    ]
  },
  {
    title: "Summary",
    items: [
      { label: "Account Status", value: "Active" },
      { label: "Member Since", value: "2024" },
      { label: "Subscription", value: "Premium" }
    ]
  }
];

type ReminderBaseScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'ReminderBaseScreen'>;
};

const ReminderBaseScreen: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const page = Math.round(offsetX / width);
    if (currentPage !== page) {
      setCurrentPage(page);
    }
  };

  const scrollToPage = (pageIndex: number): void => {
    scrollViewRef.current?.scrollTo({
      x: pageIndex * width,
      animated: true,
    });
    setCurrentPage(pageIndex);
  };

  return (
    <View style={styles.container}>
      <PageIndicator
        totalDots={pageData.length}
        currentIndex={currentPage}
      />
      
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={styles.scrollView}
      >
        {pageData.map((page, index) => (
          <View key={index} style={[styles.page, { width }]}>
            <PageContent {...page} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

// Styles with TypeScript StyleSheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    gap: 6,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
  scrollView: {
    flex: 1,
  },
  page: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
  pageCard: {
    width: '100%',
    elevation: 4,
  },
  formContainer: {
    marginTop: 16,
    gap: 12,
  },
});

export default ReminderBaseScreen;