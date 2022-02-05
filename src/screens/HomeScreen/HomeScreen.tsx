import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
} from "react-native";
import firebase from "../../firebase/config";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import styles from "./styles";
import Popover, {
  PopoverMode,
  PopoverPlacement,
} from "react-native-popover-view";
import { initializeApp } from "firebase/app";

export default function HomeScreen(props) {
  useEffect(() => {
    const firebaseConfig = {
      apiKey: "AIzaSyBkX18PD0SbYip0JlwvSg9g2pa-Pg2wjAM",
      authDomain: "coda-rn-test.firebaseapp.com",
      databaseURL: "https://coda-rn-test.firebaseio.com",
      projectId: "coda-rn-test",
      storageBucket: "coda-rn-test.appspot.com",
      messagingSenderId: "336379074307",
      appId: "1:336379074307:ios:5ac92f1a2905430c5e7b36",
    };

    initializeApp(firebaseConfig);
  }, []);

  const [showPopover1, setShowPopover1] = useState(false);
  const [showPopover2, setShowPopover2] = useState(false);
  const [showPopover3, setShowPopover3] = useState(false);
  const [answer, setAnswer] = useState("");
  const [isContinue, setIsContinue] = useState(false);
  const [result, setResult] = useState("");

  function checkAnswer() {
    if (answer === "Hause") {
      setResult("correct");
    } else {
      setResult("wrong");
    }
  }

  async function nextQuestion() {
    setAnswer("");
    setIsContinue(false);
    setResult("");
    const firestore = getFirestore();
    await setDoc(doc(firestore, "results", "ldmoIlxJwlkMWG8pOpcB"), {
      answer: "2",
      question_id: "2",
      user_id: "u_2",
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.main_content}>
        <Text style={styles.question_header}>Fill in the missing word</Text>
        <Text style={styles.question_title}>
          The <Text style={styles.question_title_word}>house</Text> is small.
        </Text>
        <View style={styles.question_content}>
          <>
            <Popover
              isVisible={showPopover1}
              onRequestClose={() => setShowPopover1(false)}
              placement={PopoverPlacement.TOP}
              verticalOffset={25}
              from={
                <TouchableOpacity onPress={() => setShowPopover1(true)}>
                  <Text style={styles.question_content_meaning_word}>Das</Text>
                </TouchableOpacity>
              }
            >
              <Text style={styles.question_content_popover_word}>The</Text>
            </Popover>
            {answer ? (
              <View style={styles.question_outer_missing_word}>
                <Text style={styles.question_content_missing_word}>
                  {answer}
                </Text>
              </View>
            ) : (
              <Text style={styles.question_content_empty_word}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </Text>
            )}
            <Popover
              isVisible={showPopover2}
              onRequestClose={() => setShowPopover2(false)}
              placement={PopoverPlacement.TOP}
              verticalOffset={25}
              from={
                <TouchableOpacity onPress={() => setShowPopover2(true)}>
                  <Text style={styles.question_content_meaning_word}>ist</Text>
                </TouchableOpacity>
              }
            >
              <Text style={styles.question_content_popover_word}>is</Text>
            </Popover>
            <Popover
              isVisible={showPopover3}
              onRequestClose={() => setShowPopover3(false)}
              placement={PopoverPlacement.TOP}
              verticalOffset={25}
              from={
                <TouchableOpacity onPress={() => setShowPopover3(true)}>
                  <Text style={styles.question_content_meaning_word}>
                    kelin.
                  </Text>
                </TouchableOpacity>
              }
            >
              <Text style={styles.question_content_popover_word}>small</Text>
            </Popover>
          </>
        </View>
        <View style={styles.question_answer}>
          <TouchableOpacity
            style={styles.button_answer}
            onPress={() => {
              setAnswer("folgen");
              setIsContinue(true);
            }}
          >
            <Text style={styles.answer}>folgen</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button_answer}
            onPress={() => {
              setAnswer("Schaf");
              setIsContinue(true);
            }}
          >
            <Text style={styles.answer}>Schaf</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button_answer}
            onPress={() => {
              setAnswer("Bereiden");
              setIsContinue(true);
            }}
          >
            <Text style={styles.answer}>Bereiden</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button_answer}
            onPress={() => {
              setAnswer("Hause");
              setIsContinue(true);
            }}
          >
            <Text style={styles.answer}>Hause</Text>
          </TouchableOpacity>
        </View>
        {!isContinue && result === "" && (
          <TouchableOpacity style={styles.button_continue}>
            <Text style={styles.text_continue}>CONTINUE</Text>
          </TouchableOpacity>
        )}
        {isContinue && result === "" && (
          <View style={styles.outer_result}>
            <Text style={styles.text_result}></Text>
            <TouchableOpacity
              style={styles.button_check_answer}
              onPress={() => {
                checkAnswer();
              }}
            >
              <Text style={styles.text_check_answer}>CHECK ANSWER</Text>
            </TouchableOpacity>
          </View>
        )}
        {result === "correct" && (
          <View style={styles.outer_result_correct}>
            <Text style={styles.text_result}>Great Job!</Text>
            <TouchableOpacity
              style={styles.button_answer_correct}
              onPress={() => {
                nextQuestion();
              }}
            >
              <Text style={styles.text_answer_correct}>CONTINUE</Text>
            </TouchableOpacity>
          </View>
        )}
        {result === "wrong" && (
          <View style={styles.outer_result_wrong}>
            <Text style={styles.text_result}>Answer: Hause</Text>
            <TouchableOpacity
              style={styles.button_answer_wrong}
              onPress={() => {
                nextQuestion();
              }}
            >
              <Text style={styles.text_answer_wrong}>CONTINUE</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}
