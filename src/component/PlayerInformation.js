import React, { useEffect } from 'react';


function PlayerInformation(props) {


    return (
        <section className="playerProfile">
            <h1>PlayerProfile</h1>
            {props && (
                <article>
                    <p>{props.playerInformation.name}</p>
                    <a href={`${props.playerInformation.url}`} target="_blank">
                        <img src={`${props.playerInformation.avatar}`} alt="Avatar" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
                    </a>
                    
                    <p>{props.playerInformation.country}</p>
                    <p>{props.playerInformation.dateJoined}</p>
                    <p>{props.playerInformation.url}</p>


                </article>
            )}
        </section>
    );
}

export default PlayerInformation;
