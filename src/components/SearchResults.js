import React, { useState, useEffect } from 'react';

export default function SearchResults(props) {

    return(
        <div className = "p-10">
            <h2 className = "text-xl font-bold text-teal-600">Summary</h2>
            <br></br>
            <p className = "text-md text-left">
                COVID-19, caused by SARS-CoV-2, can involve sequelae and other medical complications that last weeks to months after initial recovery, which has come to be called Long-COVID or COVID long-haulers. This systematic review and meta-analysis aims to identify studies assessing long-term effects of COVID-19 and estimates the prevalence of each symptom, sign, or laboratory parameter of patients at a post-COVID-19 stage. LitCOVID (PubMed and Medline) and Embase were searched by two independent researchers. All articles with original data for detecting long-term COVID-19 published before 1st of January 2021 and with a minimum of 100 patients were included. For effects reported in two or more studies, meta-analyses using a random-effects model were performed using the MetaXL software to estimate the pooled prevalence with 95% CI. 
                <br></br>
                The current time is {props.currentTime}
                <br></br>
                The current count is {props.count}
            </p>
            <br></br>
            <h2 className = "text-xl font-bold text-teal-600">Sources</h2>
            {/* <button onClick={() => setCount(prevCount => prevCount + 1)}>Add</button> */}
        </div>
        )
    }


