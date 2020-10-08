
let voteInProgress = false

type Votes = {
    [name: string]: number
}

let votes: Votes = {}

let timeLeft = 30 // seconds

type Results = {
    [key: number]: number
}

const collectResults = () => {
    const results: Results = {}
    Object.values(votes).forEach((vote) => {
        if(Object.prototype.hasOwnProperty.call(results, vote)) {
            results[vote] ++
        } else {
            results[vote] = 1
        }
    })
    return results
}

/**
 * trigger vote command
 * @param topic string voting topic
 */
export const initiateVote = (topic: string): void => {
    if(!voteInProgress) {
        console.log('starting vote', topic);
        
        // set voting in progress
        voteInProgress = true
        // reset votes
        votes = {}
        // Start timer
        const interval = setInterval(() => {
            if(timeLeft > 0) {
                timeLeft--
            } else {
                clearInterval(interval)
                // voting over
                voteInProgress = false
                // get results
                const results = collectResults()
                console.log({ results });
                
            }
        }, 1000)
    }
}

export const castVote = (name: string, value: number): void => {
    if(voteInProgress) {
        console.log(name, 'votes for', value)
        votes[name] = value
    } else {
        console.log('!!!! vote is not in progress')
    }
}
