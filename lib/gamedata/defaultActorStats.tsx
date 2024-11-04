export const pb = [2,3,3,4,5,5,6,7,7,8,9,9,10,11,11,12,13,13,14];
export const ab = pb.map((el: number)=>2+el);
export const pp = [...Array(20).keys()].map((el: number)=>6+el*4);
export const level = [...Array(20).keys()].map((el: number)=>el+1);

export const proficientDefense = pb.map((el: number)=>10+el);
export const nonproficientDefense = pb.map((el: number)=>10+Math.floor(el/2));

export const rogueDefaults = {
    pb: pb,
    pp: pp,
    hp: [...Array(20).keys()].map((el: number)=>16+el*8),
    fortitude: nonproficientDefense,
    reflex: proficientDefense,
    will: nonproficientDefense,
    armor: proficientDefense,
    stamina: [9,9,9,9,9,9,9,9,9,9],
    ab: ab,
    ad: level.map((el:number)=>4+Math.floor(el*0.8)),
    ap: level.map((el:number)=>2+Math.floor(el*0.6))
}

export const fighterDefaults = {
    pb: pb,
    pp: pp,
    hp: [...Array(20).keys()].map((el: number)=>20+el*10),
    fortitude: proficientDefense,
    reflex: nonproficientDefense,
    will: nonproficientDefense,
    armor: proficientDefense,
    stamina: [9,9,9,9,9,9,9,9,9,9],
    ab: ab,
    ad: level.map((el:number)=>3+Math.floor(el*0.7)),
    ap: level.map((el:number)=>1+Math.floor(el*0.6))
}

export const mageDefaults = {
    pb: pb,
    hp: [...Array(20).keys()].map((el: number)=>15+el*5),
    pp: pp,
    fortitude: nonproficientDefense,
    reflex: nonproficientDefense,
    will: proficientDefense,
    armor: nonproficientDefense,
    stamina: [9,9,9,9,9,9,9,9,9,9],
    ab: ab,
    ad: level.map((el:number)=>2+Math.floor(el*0.6)),
    ap: level.map((el:number)=>3+Math.floor(el*0.6))
}

export const roleDefaultStats = {
    'mage': mageDefaults,
    'fighter': fighterDefaults,
    'rogue': rogueDefaults,
    'unique': rogueDefaults,
    'bruiser': fighterDefaults,
    'marksman': rogueDefaults,
    'striker': rogueDefaults,
    'assassin': rogueDefaults,
    'controller': mageDefaults,
    'leader': fighterDefaults,
    'blaster': mageDefaults,
    'defender': fighterDefaults
}