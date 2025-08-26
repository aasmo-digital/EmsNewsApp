import React, { useState, useEffect, memo } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";

const PollCompt = ({ pollData }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [voted, setVoted] = useState(false);

 

  const handleVote = (index) => {
    if (!voted) {
      setSelectedOption(index);
      setVoted(true);
      // TODO: API call here to submit vote
    }
  };

  const renderOption = ({ item, index }) => {
    const isSelected = selectedOption === index;
    let percentage = 0;
    if (voted) {
      const total = pollData.votes.reduce((a, b) => a + b, 0);
      percentage = ((pollData.votes[index] / total) * 100).toFixed(1);
    }

    return (
      <TouchableOpacity
        style={[styles.option, isSelected && styles.selectedOption]}
        onPress={() => handleVote(index)}
        disabled={voted}
      >
        <Text style={styles.optionText}>{item}</Text>
        {voted && <Text style={styles.percentage}>{percentage}%</Text>}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.questionHindi}>{pollData.questionHindi}</Text>
      <Text style={styles.questionEnglish}>{pollData.questionEnglish}</Text>

      <FlatList
        data={pollData.options}
        renderItem={renderOption}
        keyExtractor={(_, i) => i.toString()}
      />

      {voted && (
        <Text style={styles.totalVotes}>
          Total Votes: {pollData.votes.reduce((a, b) => a + b, 0)}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    margin: 10,
    elevation: 3,
  },
  questionHindi: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#333",
  },
  questionEnglish: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
  },
  option: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  selectedOption: {
    backgroundColor: "#007bff20",
    borderColor: "#007bff",
  },
  optionText: {
    fontSize: 16,
    color: "#333",
  },
  percentage: {
    fontSize: 14,
    color: "#007bff",
    fontWeight: "bold",
  },
  totalVotes: {
    marginTop: 10,
    fontSize: 14,
    color: "#555",
    textAlign: "right",
  },
});

export default memo(PollCompt);
