
import React from 'react';

import { FlexRow, NumericIncDecContainer, Label, NumberInput, IncDecArrow, IncDecArrowContainer, DropDownBox } from '../styles';

const InputControls = ({ start, end, selectedTeam, firstMove, onStartChange, onEndChange, onTeamChange, onFirstMoveChange, onStartInc, onStartDec, onEndInc, onEndDec }) => (
    <FlexRow>
        <NumericIncDecContainer>
            <Label htmlFor="startInput">Start:</Label>
            <NumberInput id="startInput" value={start} onChange={onStartChange} />
            <IncDecArrowContainer>
                <IncDecArrow onClick={onStartInc}>&uarr;</IncDecArrow>
                <IncDecArrow onClick={onStartDec}>&darr;</IncDecArrow>
            </IncDecArrowContainer>
        </NumericIncDecContainer>
        <NumericIncDecContainer>
            <Label htmlFor="endInput">End:</Label>
            <NumberInput id="endInput" value={end} onChange={onEndChange} />
            <IncDecArrowContainer>
                <IncDecArrow onClick={onEndInc}>&uarr;</IncDecArrow>
                <IncDecArrow onClick={onEndDec}>&darr;</IncDecArrow>
            </IncDecArrowContainer>
        </NumericIncDecContainer>
        <div>
            <Label htmlFor="teamSelect">Select Team:</Label>
            <DropDownBox id="teamSelect" value={selectedTeam} onChange={onTeamChange}>
                <option value="white">White</option>
                <option value="black">Black</option>
            </DropDownBox>
        </div>
        <div>
            <Label htmlFor="firstMoveSelect">First Move:</Label>
            <DropDownBox id="firstMoveSelect" value={firstMove} onChange={onFirstMoveChange}>
                <option value="1.e4">1.e4</option>
                <option value="1.d4">1.d4</option>
                <option value="other">Other</option>
            </DropDownBox>
        </div>
    </FlexRow>
);

export default InputControls;