const e = require("express");

const generate_itemsets = items => {
    const players = [];
    
    for(const item of items) {
        players.push(item.player);
    }

    const values = combinations(players);
    let response = values;

    for(let value of values) {
        response = response.concat(permute(value)); 
    }
    
    return Array.from(new Set(response.map(JSON.stringify)), JSON.parse);
}

const combinations = array => {
    return new Array(1 << array.length).fill().map(
        (element1, index1) => array.filter((element2, index2) => index1 & 1 << index2));
}

const permute = permutation => {
    const length = permutation.length;
    const result = [permutation.slice()];
    let c = new Array(length).fill(0);
    let i = 1;
    let k, p;

    while(i < length) {
        if(c[i] < i) {
            k = i % 2 && c[i];
            p = permutation[i];
            permutation[i] = permutation[k];
            permutation[k] = p;
            ++c[i];
            i = 1;
            result.push(permutation.slice());
        } else {
            c[i] = 0;
            ++i;
        }
    }
    return result;
}

const support = items => {
    const transactions = items;
    const ocurrencies = {};

    for(const item of transactions) {
        for(const player of item) {
            if(ocurrencies[player]) {
                ocurrencies[player] += 1;
            } else {
                ocurrencies[player] = 1;
            }
        }
    }

    const supp = {};

    for(const player in ocurrencies) {
        supp[player] = ocurrencies[player] / transactions.length;
    }

    return supp;
}

module.exports = {
    generate_itemsets,
    support
}