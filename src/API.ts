import { shuffelArray} from './utils'
export interface Question{
    catagory : string,
    correct_answer : string,
    difficulty : DifficultyType,
    incorrect_answers: string[],
    question: string,
    type: string
}

export interface QuestionState extends Question{
    answers: string[]
}

export enum DifficultyType{
Easy = "easy",
Medium = "medium",
Hard = "hard"
}

export const fetchQuizQuestions = async (amount: number, difficulty: DifficultyType)=>{
    const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`
    const data = await (await fetch(endpoint)).json()
    console.log('====',data)
    return data.results.map((question:Question)=>(
        {
            ...question,
            answers: shuffelArray([...question.incorrect_answers, question.correct_answer])
        }
    ))
}