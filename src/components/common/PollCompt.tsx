// import React, { useState, useEffect, memo } from "react";
// import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";

// const PollCompt = ({ pollData }) => {
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [voted, setVoted] = useState(false);

//   const handleVote = (index) => {
//     if (!voted) {
//       setSelectedOption(index);
//       setVoted(true);
//       // TODO: API call here to submit vote
//     }
//   };

//   const renderOption = ({ item, index }) => {
//     const isSelected = selectedOption === index;
//     let percentage = 0;
//     if (voted) {
//       const total = pollData?.votes.reduce((a, b) => a + b, 0);
//       percentage = ((pollData?.votes[index] / total) * 100).toFixed(1);
//     }

//     return (
//       <TouchableOpacity
//         style={[styles.option, isSelected && styles.selectedOption]}
//         onPress={() => handleVote(index)}
//         disabled={voted}
//       >
//         <Text style={styles.optionText}>{item}</Text>
//         {voted && <Text style={styles.percentage}>{percentage}%</Text>}
//       </TouchableOpacity>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.questionHindi}>{pollData?.questionHindi}</Text>
//       <Text style={styles.questionEnglish}>{pollData?.questionEnglish}</Text>

//       <FlatList
//         data={pollData?.options}
//         renderItem={renderOption}
//         keyExtractor={(_, i) => i.toString()}
//       />

//       {voted && (
//         <Text style={styles.totalVotes}>
//           Total Votes: {pollData?.votes.reduce((a, b) => a + b, 0)}
//         </Text>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: "#fff",
//     padding: 15,
//     borderRadius: 10,
//     margin: 10,
//     elevation: 3,
//   },
//   questionHindi: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginBottom: 4,
//     color: "#333",
//   },
//   questionEnglish: {
//     fontSize: 14,
//     color: "#666",
//     marginBottom: 12,
//   },
//   option: {
//     padding: 12,
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: "#ccc",
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 8,
//   },
//   selectedOption: {
//     backgroundColor: "#007bff20",
//     borderColor: "#007bff",
//   },
//   optionText: {
//     fontSize: 16,
//     color: "#333",
//   },
//   percentage: {
//     fontSize: 14,
//     color: "#007bff",
//     fontWeight: "bold",
//   },
//   totalVotes: {
//     marginTop: 10,
//     fontSize: 14,
//     color: "#555",
//     textAlign: "right",
//   },
// });

// export default memo(PollCompt);

// import React, {useState, memo, useEffect} from 'react';
// import {View, Text, TouchableOpacity, StyleSheet, FlatList} from 'react-native';

// const PollCompt = ({pollData}: any) => {
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [voted, setVoted] = useState(pollData?.hasVoted || false); // agar backend bole user ne vote kiya h
//   const [options, setOptions] = useState(pollData?.options || []);

//   console.log('--------pollData-------', pollData?.options);
//   console.log('-----options------', options);

//   const handleVote = index => {
//     if (!voted) {
//       setSelectedOption(index);
//       setVoted(true);

//       // locally increment votes
//       const updated = [...options];
//       updated[index].votes += 1;
//       setOptions(updated);

//       // TODO: API call yahan karein to submit vote
//     }
//   };

//   const renderOption = ({item, index}) => {
//     const isSelected = selectedOption === index;
//     let percentage = 0;

//     if (voted && pollData?.totalVotes + 1 > 0) {
//       const total = options.reduce((sum, opt) => sum + opt.votes, 0);
//       percentage = ((item?.votes / total) * 100).toFixed(1);
//     }

//     return (
//       <TouchableOpacity
//         style={[styles.option, isSelected && styles.selectedOption]}
//         onPress={() => handleVote(index)}
//         disabled={voted}>
//         <Text style={styles.optionText}>{item?.text}</Text>
//         {voted && <Text style={styles.percentage}>{percentage}%</Text>}
//       </TouchableOpacity>
//     );
//   };
//   useEffect(() => {
//     if (pollData?.options) {
//       setOptions(pollData.options);
//     }
//   }, [pollData]);
//   return (
//     <View style={styles.container}>
//       <Text style={styles.question}>{pollData?.question}</Text>

//       <FlatList
//         data={pollData?.options}
//         renderItem={renderOption}
//         keyExtractor={(_, i) => i.toString()}
//       />

//       {voted && (
//         <Text style={styles.totalVotes}>
//           Total Votes: {options.reduce((a, b) => a + b.votes, 0)}
//         </Text>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: '#fff',
//     padding: 15,
//     borderRadius: 10,
//     margin: 10,
//     elevation: 3,
//   },
//   question: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 12,
//     color: '#333',
//   },
//   option: {
//     padding: 12,
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 8,
//   },
//   selectedOption: {
//     backgroundColor: '#007bff20',
//     borderColor: '#007bff',
//   },
//   optionText: {
//     fontSize: 16,
//     color: '#333',
//   },
//   percentage: {
//     fontSize: 14,
//     color: '#007bff',
//     fontWeight: 'bold',
//   },
//   totalVotes: {
//     marginTop: 10,
//     fontSize: 14,
//     color: '#555',
//     textAlign: 'right',
//   },
// });

// export default memo(PollCompt);

import React, {useState, memo, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Animated,
} from 'react-native';
import ApiRequest from '../../services/api/ApiRequest';
import ApiRoutes from '../../services/config/ApiRoutes';
import {useSelector} from 'react-redux';
import ButtonCompt from './ButtonCompt';

const PollCompt = ({pollData}: any) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [voted, setVoted] = useState(pollData?.hasVoted || false);
  const [options, setOptions] = useState(pollData?.options || []);
  const [submitloading, setSubmitPollLoading] = useState(false);
  const pollId = pollData?._id;
  const token = useSelector(state => state.UserData?.token);

  useEffect(() => {
    if (pollData?.options) {
      setOptions(pollData.options);
      setVoted(pollData?.hasVoted || false);
    }
  }, [pollData]);

  const handleVote = (index: number) => {
    if (!voted) {
      setSelectedOption(index);
      setVoted(true);

      const updated = options.map((opt, i) =>
        i === index ? {...opt, votes: opt.votes + 1} : opt,
      );
      setOptions(updated);

      // TODO: API call yahan karein
    }
  };

  const renderOption = ({item, index}) => {
    const isSelected = selectedOption === index;

    const total = options.reduce((sum, opt) => sum + opt.votes, 0);
    const percentage = total > 0 ? (item.votes / total) * 100 : 0;

    return (
      <TouchableOpacity
        style={styles.optionWrapper}
        onPress={() => handleVote(index)}
        disabled={voted}>
        <View style={styles.optionRow}>
          <Text style={styles.optionText}>{item?.text}</Text>
          {voted && (
            <Text style={styles.percentageText}>{percentage.toFixed(0)}%</Text>
          )}
        </View>

        {/* progress bar */}
        <View style={styles.progressBackground}>
          <Animated.View
            style={[
              styles.progressFill,
              {
                width: `${percentage}%`,
                backgroundColor: isSelected ? '#007bff' : '#999',
              },
            ]}
          />
        </View>
      </TouchableOpacity>
    );
  };

  const voteOnPoll = async () => {
    setSubmitPollLoading(true);
    try {
      const response = await ApiRequest({
        BaseUrl: ApiRoutes.voteOnPoll + {pollId} + '/vote',
        method: 'POST',
        token: token,
        request: {
          optionIndex: '2',
        },
      });

      if (response?.success) {
        setSubmitPollLoading(false);
        console.log('----voteOnPoll-----', response?.data);
        // setPollData(response?.data);
      } else {
        setSubmitPollLoading(false);
      }
    } catch (error: any) {
      setSubmitPollLoading(false);
      console.error('getAllPolls Error:', error.message);
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.question}>{pollData?.question}</Text>

      <FlatList
        data={options}
        renderItem={renderOption}
        keyExtractor={(_, i) => i.toString()}
      />

      {/* <TouchableOpacity
        onPress={voteOnPoll}
        style={[styles.voteButton, voted && {backgroundColor: '#ccc'}]}
        disabled={voted}>
        <Text style={styles.voteButtonText}>{voted ? 'Voted' : 'Vote'}</Text>
      </TouchableOpacity> */}

      <ButtonCompt
        title={voted ? 'Voted' : 'Vote'}
        onPress={voteOnPoll}
        isLoading={submitloading}
      />

      {voted && (
        <Text style={styles.totalVotes}>
          {options.reduce((a, b) => a + b.votes, 0)} votes
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    margin: 12,
    elevation: 4,
  },
  question: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 14,
    color: '#111',
  },
  optionWrapper: {
    marginBottom: 12,
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  optionText: {
    fontSize: 15,
    color: '#333',
  },
  percentageText: {
    fontSize: 14,
    color: '#555',
    fontWeight: 'bold',
  },
  progressBackground: {
    height: 8,
    borderRadius: 6,
    backgroundColor: '#eee',
    overflow: 'hidden',
  },
  progressFill: {
    height: 8,
    borderRadius: 6,
  },
  voteButton: {
    marginTop: 10,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#6c63ff',
    alignItems: 'center',
  },
  voteButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  totalVotes: {
    marginTop: 10,
    fontSize: 13,
    color: '#444',
    textAlign: 'right',
  },
});

export default memo(PollCompt);
