import Head from "next/head";
import styles from "@/styles/Home.module.scss";
import Header from "@/components/Molecules/Header/Header";
import WindowBox from "@/components/Organism/Window/WindowBox";
import InputBox from "@/components/Molecules/InputBox/InputBox";
import { useState } from "react";
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

  const isSelected = genre !== "";

  const handleGenerate = async () => {
    setLoading(true);
    const prompt = `generate a ${genre} story for ${
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

  const handleVoice = () => {
    const utterance = new SpeechSynthesisUtterance(response);
    utterance.lang = "en-US";
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
                {response && (
                  <>
                    <div>{response}</div>
                    {isPlaying ? (
                      <Button label="Stop" onClick={handleStopVoice} />
                    ) : (
                      <Button label="Speak" onClick={handleVoice} />
                    )}
                  </>
                )}
              </div>
            )}
          </WindowBox>
        </div>
      </main>
    </>
  );
}
