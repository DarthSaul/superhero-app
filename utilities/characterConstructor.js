class Character {
    constructor(name, description, thumbnail){
        this.name = name;
        this.description = description;
        this.thumbnail = `${thumbnail}/portrait_fantastic.jpg`
    }
};

module.exports = Character;