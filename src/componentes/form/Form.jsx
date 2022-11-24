import React, { useRef, useState, useEffect } from "react";
import { ethers } from "ethers";
import Survey from '../../artifacts/contracts/Survey.sol/Survey.json';
import './formStyles.css';
import quiz from '../../survey-sample.json';

const contractAcc = "0x437eF217203452317C3C955Cf282b1eE5F6aaF72";


export default function Form() {
    const id = 181818;

    async function requestAcc() {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
    }

    async function setSurvey() {
        try {
            if (typeof window.ethereum !== undefined) {
                await requestAcc();

                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                console.log(signer);

                const contract = new ethers.Contract(contractAcc, Survey.abi, signer);
                console.log(contract);
                const transaction = await contract.submit(id, [1, 3, 1]);
                transaction.wait();
                await contract.setCooldown(10);
                console.log(transaction);
            }
        } catch (error) {
            console.log(error);
        };
    }

    const [currentAns, setCurrentAns] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const [lifeTime, setLifeTime] = useState(15);
    const [areDisabled, setAreDisabled] = useState(false);
    const [respuesta, setRespuesta] = useState([]);

    function handleAnswerSubmit(text) {


        setTimeout(() => {
            if (currentAns === quiz.questions.length - 1) {
                setIsFinished(true);
            } else {
                setCurrentAns(currentAns + 1);
            }
        }, 300);
        setRespuesta((prevState) => ([...prevState, text]));
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if (lifeTime > 0) setLifeTime((prev) => prev - 1);
            if (lifeTime === 0) setAreDisabled(true);
        }, 1000);

        return () => clearInterval(interval);
    }, [lifeTime]);

    if (isFinished) return (
        <div className="page">
            <div id="text">
                <div className="log">
                    <p>Estas fueron tus respuestas:</p>
                    <p>{quiz.questions[0].text}: {respuesta[0]}</p>
                    <p>{quiz.questions[1].text}: {respuesta[1]}</p>
                    <p>{quiz.questions[2].text}: {respuesta[2]}</p>
                    <button className="Button" onClick={setSurvey}>Terminar Quiz</button>
                </div>
            </div>
        </div>
    );

    return (
        <div className="page">
            <div id="text">
                <div className="log">
                    <div>
                        <span>{currentAns + 1}/{quiz.questions.length}</span>
                        <div>{!areDisabled ? (
                            <span className="lifeTime">Tiempo restante: {lifeTime}</span>
                        ) : (
                            <button className="nextButton" onClick={() => {
                                setAreDisabled(false);
                                setLifeTime(15);
                                setCurrentAns(currentAns + 1);
                                setRespuesta((prevState) => ([...prevState, 'No answer']));
                            }}>Siguiente pregunta</button>
                        )}
                        </div>
                    </div>

                    <div className="titleQ">
                        {quiz.questions[currentAns].text}
                    </div>
                    <img src={quiz.questions[currentAns].image} className="QuestionImg" alt="img" />
                    <div className="answers">
                        {quiz.questions[currentAns].options.map((answer) => (
                            <button disabled={areDisabled} key={answer.text} className="ButtonRsp" onClick={() => handleAnswerSubmit(answer.text)}>{answer.text}</button>))}
                    </div>
                </div>
            </div>
        </div>
    );
}
