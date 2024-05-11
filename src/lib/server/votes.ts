import { countries, type CountryISO } from "$lib/countries";

export interface Vote {
    country: CountryISO;
    rank: number;
    score: number;
}

// Username -> Votes
const votes = new Map<string, Vote[]>();

export function vote(username: string, userVote: Vote) {
    if (!votes.has(username)) {
        votes.set(username, [userVote])
    } else {
        let prevVote = votes.get(username)?.find((e) => e.country === userVote.country)
        if (prevVote) {
            prevVote.rank = userVote.rank;
            prevVote.score = userVote.score;
        } else {
            votes.get(username)?.push(userVote);
        }
    }
}

export function getVotes(username: string): Vote[] {
    return votes.get(username) ?? [];
}

export function voteAll(username: string, userVotes: Vote[]) {
    votes.set(username, userVotes);
}

export function resetVotes(username: string) {
    votes.delete(username);
}

export function resetAllVotes() {
    votes.clear();
}

export function aggregatedResult(): Vote[] {
    let aggregated = new Map<string, Vote>();

    for (let [_, userVotes] of votes) {
        if (userVotes.length < countries.length) continue;
        userVotes.forEach((vote) => {
            if (aggregated.has(vote.country)) {
                let agg = aggregated.get(vote.country);
                agg!.rank += vote.rank;
                agg!.score += vote.score / votes.size;
            } else {
                aggregated.set(vote.country, {
                    country: vote.country,
                    rank: vote.rank,
                    score: vote.score / votes.size
                })
            }
        });
    }

    return [...aggregated.values()];
}

function calculatePositionalRank(index: number): number {
    if (index == 0) return 12;
    if (index == 1) return 10;
    return Math.max(0, 10 - index);
}