import Head from "next/head";
import styles from "@/styles/Home.module.scss";
import Header from "@/components/Molecules/Header/Header";
import WindowBox from "@/components/Organism/Window/WindowBox";
import InputBox from "@/components/Molecules/InputBox/InputBox";
import { useEffect, useRef, useState } from "react";
import SelectBox from "@/components/Molecules/SelectBox/SelectBox";
import { genres } from "@/constants/common";
import Button from "@/components/Atoms/Button/Button";
import SwitchBox from "@/components/Molecules/SwitchBox/SwitchBox";
import Loader from "@/components/Atoms/Loader/Loader";
import Toast from "@/components/Atoms/Toast/Toast";

export default function Home() {
  const [character, setCharacter] = useState("");
  const [genre, setGenre] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [approveAdult, setApproveAdult] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [question, setQuestion] = useState("");
  const [conversationResponse, setConversationResponse] = useState("");

  const latestAnswerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (latestAnswerRef.current) {
      latestAnswerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [conversationResponse]);

  const isSelected = genre !== "";

  const cleanResponse = () => {
    setResponse("");
    setConversationResponse("");
  };

  const handleGenerate = async () => {
    setLoading(true);
    cleanResponse();
    const prompt = `Generate a ${genre} story for ${
      approveAdult ? "adult" : "children"
    }, with the character named ${character} and maximum 20 sentences`;

    try {
      if (process.env.NEXT_PUBLIC_GEMINI_KEY) {
        const response = await fetch("/api/generate", {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({ prompt }),
        });

        const data = await response.json();

        if (!data.ok) {
          throw new Error("error");
        }
        setResponse(data.message);
      }
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  };

  const handleConversation = async () => {
    if (!response) return;

    setLoading(true);
    const prompt = `Story: ${response}
    Question: ${question}
    Answer the question based on the story above.`;

    try {
      const response = await fetch("/api/generate", {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();

      if (!data.ok) {
        throw new Error("error");
      }
      setConversationResponse(data.message);
    } catch (error) {
      setError(true);
    }

    setLoading(false);
  };

  const handleVoice = () => {
    const utterance = new SpeechSynthesisUtterance(response);
    utterance.lang = "en-US";
    const voices = speechSynthesis.getVoices();
    const femaleVoice = voices.find((voice) => voice.name.includes("Female"));

    if (femaleVoice) {
      utterance.voice = femaleVoice;
    }

    setIsPlaying(true);
    speechSynthesis.speak(utterance);
  };

  const handleStopVoice = () => {
    speechSynthesis.cancel();
    setIsPlaying(false);
  };

  return (
    <>
      <Head>
        <title>AI Story Teller</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Header title="AI StoryTeller" />
        <div className={styles.content}>
          {error && (
            <Toast
              title="Error"
              message="Error while creating a story"
              setAction={setError}
            />
          )}

          <WindowBox>
            <div className={styles.container}>
              <InputBox
                label="Character name"
                value={character}
                setValue={setCharacter}
              />
              <SelectBox
                label="Select Genre"
                list={genres}
                setAction={setGenre}
              />
              <SwitchBox
                label="For adults"
                value={approveAdult}
                setValue={setApproveAdult}
              />
              <Button
                label="Generate"
                onClick={() => handleGenerate()}
                disabled={!character.trim().length || !isSelected}
              />
            </div>

            {loading ? (
              <div className={styles.loading}>
                <Loader />
              </div>
            ) : (
              <div className={styles.response}>
                {response ? (
                  <>
                    {isPlaying ? (
                      <Button label="Stop" onClick={handleStopVoice} />
                    ) : (
                      <Button label="Tell me a story" onClick={handleVoice} />
                    )}
                    <div>
                      <p>{response}</p>
                    </div>

                    <div className={styles.conversation}>
                      <InputBox
                        label="Ask me a question about the story"
                        value={question}
                        setValue={setQuestion}
                      />
                      <Button
                        label="Ask"
                        onClick={handleConversation}
                        disabled={!question.trim().length}
                      />
                    </div>

                    {conversationResponse && (
                      <div ref={latestAnswerRef}>
                        {" "}
                        <p className={styles.conversation_response}>
                          {conversationResponse}
                        </p>
                      </div>
                    )}
                  </>
                ) : (
                  <h1>
                    Hello, let me tell you a <span>story</span>...
                  </h1>
                )}
              </div>
            )}
          </WindowBox>
        </div>
      </main>
    </>
  );
}
