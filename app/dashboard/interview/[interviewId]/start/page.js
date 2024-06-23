"use client"
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { db } from '@/lib/db';
import { MockInterview } from '@/lib/schema';
import QuestionsSection from './_components/page';
import RecordAnswerSection from './_components/record';

function StartInterview({params}) {

    const [interviewData,setInterviewData]=useState();
    const [mockInterviewQuestion,setMockInterviewQuestion]=useState([]);
    const [activeQuestionIndex,setActiveQuestionIndex]=useState(0);
    useEffect(()=>{
        GetInterviewDetails();
    },[]);

    /**
     * Used to Get Interview Details by MockId/Interview Id
     */
    const GetInterviewDetails=async()=>{
        try {
            const result = await db
              .select()
              .from(MockInterview)
              .where(eq(MockInterview.mockId, params.interviewId));
      
            if (result.length > 0) {
              const jsonMockResp = JSON.parse(result[0].jsonMockResp);
              setMockInterviewQuestion(jsonMockResp.interview_questions);
              setInterviewData(result[0]);
            }
          } catch (error) {
            console.error('Error fetching interview details:', error);
            // Handle error state or retry mechanism if needed
          }
    } 
    const handlePreviousQuestion = () => {
        if (activeQuestionIndex > 0) {
          setActiveQuestionIndex(activeQuestionIndex - 1);
        }
      };
    
      const handleNextQuestion = () => {
        if (activeQuestionIndex < mockInterviewQuestion.length - 1) {
          setActiveQuestionIndex(activeQuestionIndex + 1);
        }
      };
    
      const handleEndInterview = () => {
        // Handle end interview logic here, e.g., navigate to feedback page
        if (interviewData) {
          return `/dashboard/interview/${interviewData.mockId}/feedback`;
        }
        return '/dashboard'; // Default to dashboard if interviewData is not ready
      };
    
      if (!mockInterviewQuestion || mockInterviewQuestion.length === 0) {
        return <div>{''}</div>; // Placeholder for loading state
      }
  return (
    <div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
            {/* Questions  */}
            <QuestionsSection 
            mockInterviewQuestion={mockInterviewQuestion}
            activeQuestionIndex={activeQuestionIndex}
            />

            {/* Video/ Audio Recording  */}
            <RecordAnswerSection
             mockInterviewQuestion={mockInterviewQuestion}
             activeQuestionIndex={activeQuestionIndex}
             interviewData={interviewData}
            />
        </div>
        {/* Navigation Buttons */}
      <div className='flex justify-end gap-6'>
        {activeQuestionIndex > 0 && (
          <Button onClick={handlePreviousQuestion}>Previous Question</Button>
        )}
        {activeQuestionIndex < mockInterviewQuestion.length - 1 && (
          <Button onClick={handleNextQuestion}>Next Question</Button>
        )}
        {activeQuestionIndex === mockInterviewQuestion.length - 1 && (
          <Link href={handleEndInterview()}>
            <Button>End Interview</Button>
          </Link>
        )}
      </div>
    </div>
  )
}

export default StartInterview