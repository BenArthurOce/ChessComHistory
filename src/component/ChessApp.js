import React, {
    useState,
    useEffect,
} from "react";
import styled from "styled-components";
import useIsMobile from "../hooks/useIsMobile";

import ChessAppSearchForm from "./ChessAppSearchForm";
import ChessAppSwitcher from "./ChessAppSwitcher";


//
// Styles
//
const Wrapper = styled.div
`
    padding-left: ${(props) => (props.isMobile ? '0' : '25%')};
    padding-right: ${(props) => (props.isMobile ? '0' : '25%')};
    width: 100vw;
    height: 100vh;
    overflow-y: hidden;
`
;

const Inner = styled.div
`
    height: 100%;
    border: 1px solid #ddd;
`
;

const Title = styled.h1
`
    text-align: center;
    padding-bottom: 10px;
    margin-bottom: 10px;
    border-bottom: 1px solid #ddd;
`
;

function ChessApp() {

    //
    // States
    //
    const [formData, setFormData] = useState(null);
    const [renderFlag, setRenderFlag] = useState(false);

    //
    // Hooks
    //
    const isMobile = useIsMobile();

    //
    // Effects
    //
    useEffect(() => {
        if (formData) {
            setRenderFlag(checkIfAbleToRender(formData));
        } else {
            setRenderFlag(false);
        }
    }, [formData]); // Run code when the data in "ChessAppSearchForm is changed / submitted"

    //
    // Helpers
    //
    const checkIfAbleToRender = (formData) => {
        return formData.username.length >= 3 && formData.lastNGames >= 1;
    };

    const triggerFormSubmitted = (newFormData) => {
        setFormData(newFormData);
    };

    return (
        <Wrapper isMobile={isMobile}>
            <Inner>
                <Title>Chess Match History</Title>
                <section id="form">
                    <ChessAppSearchForm onFormSubmit={triggerFormSubmitted} />
                </section>

                {formData && renderFlag ? (
                    <ChessAppSwitcher
                        username={formData.username}
                        lastNGames={formData.lastNGames}
                    />
                ) : (
                    <p>Waiting for user to input data...</p>
                )}
            </Inner>
        </Wrapper>
    );
}

export default ChessApp;
