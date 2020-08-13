import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchExerciseData,
  selectExercise,
  selectIsLoadingData,
  selectFailed
} from './exerciseSlice';
import styles from '../../styles.css';

import * as Prism from 'prismjs';
import 'prismjs/components/prism-json'
import '../../prism.css'

import { Button, Segment } from 'semantic-ui-react'
import styled from 'styled-components'

//Override semanticUI styles with higher specificity
//https://styled-components.com/docs/faqs#how-can-i-override-styles-with-higher-specificity
const StyledButton = styled(Button)`
&&& {
	color: white;
	background-color: #782144
}
&&&:hover {
	background-color: #510024;
}`

export function Exercise(_props) {
  const dispatch = useDispatch();
  const exercises = useSelector(selectExercise)
  const isLoadingData = useSelector(selectIsLoadingData)
  const failed = useSelector(selectFailed)

  const exampleResponse = (
	<pre><code className="language-json">
	  {`//Example response\n{
	  "0": {
		"tags": [],
		"_id": "5f32ddcda73ec62184007695",
		"section": "Section 1",
		"category": "Category 1",
		"subcategory": "Subcategory 1",
		"exerciseCategory": "Exercise Category 1",
		"answer": "Answer 1",
		"question": "Question 1"
		}
}`}
	</code></pre>
  )
  const jsonResponse = (response) => (
	<pre><code className="language-json">{`${response}`}</code></pre>
  )

  const toJsonObject = array => {

	  let i = 0
	  let response = {}
	  for(let e of array){
		  response[i] = e
		  i++;
	  }
	  /*
	  setTimeout(()=>{
		  Prism.highlightAll()
	  }, 100)
	  */

	  return (JSON.stringify(response, null, '	'))
  }

  useEffect(() => Prism.highlightAll())

  return (
	<Segment basic textAlign="center">
	  	{(exercises.length == 0 ) ? exampleResponse
				: jsonResponse(toJsonObject(exercises))
		}
	        <br/>
		<StyledButton
		  size="huge"
	  	  loading={isLoadingData}
		  onClick={() => dispatch(fetchExerciseData())}
		>
			Fetch exercises	
		</StyledButton>
	</Segment>
  );
}
