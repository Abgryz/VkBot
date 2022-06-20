const { VK } = require('vk-io');
const fs = require("fs")
const config = require('../vkbot/config.json');

let godeMode = [257047031]
let tagId = []
let noobsContent = ''
const prefix = '[club180247918|@yasobakaa] '
const gif = {
    zoomer: "https://tenor.com/view/zoomer-wojakzoomer-gif-22445581.gif",
    monke: "https://tenor.com/view/monkey-gif-19966576.gif",
}
const photos = {
    dajZarplatu: 'https://sun9-60.userapi.com/s/v1/ig2/TELFP9ZBWRHlXWnRILoL-kJSOOcEuQBxFXlamSIzQ1n4ayj_eDadMgxlCjyQ40cI12JKuXJsFDFFpjaVdSXCaDCN.jpg?size=1080x1080&quality=96&type=album',
    detiZarplaty: 'https://sun9-52.userapi.com/s/v1/if1/-f3IONWV1BZ6dFTS_WdshV4kgscAiJZubYyVLdRol-iVIs37TdMjifUxfXC4dMUrc5LKYRSu.jpg?size=900x900&quality=96&type=album',
    umniyDed: 'https://sun9-74.userapi.com/s/v1/ig2/84IcpsPcTYWNkkL69cYINqhhnw85J0yZVfRgh2YUEm9wT4GOksQJ28x7yaRFPk31qW23KWI-t1cSgS2nJFXUrJ5E.jpg?size=330x412&quality=96&type=album',
}
const noobFile = 'noobs.txt'

function readNoobs (){
    noobsContent = fs.readFileSync(noobFile, "utf8")
    let tagArr = noobsContent.split(' ')
    if(tagArr[0] == ''){
        tagArr.shift()
    }
    return tagArr
}

try{
    tagId = readNoobs(tagId)
    console.log(tagId)
}
catch(err){
    fs.writeFileSync(noobFile)
}

const bot = new VK({
    token:config.token,
    apiMode:'parallel'
})

bot.updates.on('message', msg => {
    console.log(msg)
    let text = msg.text.trim().toLowerCase()
    const userId = msg.senderId
    if(text.startsWith(prefix)) text = text.replace(prefix, '')
    switch(text){
        case "борисов":{
            msg.send('Гей')
            break
        }
        case ',jhbcjd':{
            msg.send('Utq')
            break
        }
        case "!созватьнубасов":{
            if(godeMode.includes(userId)){
                let str = ""
                for(id of tagId){
                    str += `@${id} `
                }
                msg.send(`${str} гов дебиков`)
            }
            else{
                msg.sendDocuments({
                    value: gif.zoomer,
                    filename: 'zoomer.gif'
                })
            }
            break
        }
        case (text.includes('return to monke')? text : ''):{
            msg.sendDocuments({
                value: gif.monke,
                filename: 'monke.gif'
            })
            break
        }
        case (text.includes('что такое аксеот')? text : ''):{
            msg.send(config.axeoth)
            break
        }
        case (text.includes('зарплат')? text : ''):{
            switch(Math.floor((Math.random() * 10)) % 3){
                case 0:{
                    msg.send('ЗАРПЛАТА РЕАЛЬНА!!!')
                    break
                }
                case 1:{
                    msg.sendPhotos({
                        value: photos.dajZarplatu
                    })
                    break
                }
                case 2:{
                    msg.sendPhotos({
                        value: photos.detiZarplaty
                    })
                    break
                }
            }
            break
        }
        case (text.startsWith('!добавитьнубасов') ? text : ''):{
            if(godeMode.includes(userId)){
                let noobs = text.split(" ")
                noobs.shift()
                console.log(noobs)
                noobs.forEach((elem) => {
                    if(!tagId.includes(elem)){
                        tagId.push(elem)
                        fs.appendFileSync("noobs.txt", ` ${elem}`)
                    }
                    console.log(tagId)
                })
                msg.send("Нубасы добавлены")
            }
            else{
                msg.sendDocuments({
                    value: gif.zoomer,
                    filename: 'zoomer.gif'
                })
            }
            break
        }
        case (text.startsWith('!удалитьнубасов') ? text : ''):{
            if(godeMode.includes(userId)){
                let noobs = text.split(" ")
                noobs.shift()
                console.log(noobs)
                noobs.forEach(elem => noobsContent = noobsContent.replace(` ${elem}`, ''))
                fs.writeFileSync(noobFile, noobsContent)
                tagId = readNoobs(tagId)
                console.log(tagId)
                msg.send("Нубасы удалены")
            }
            else{
                msg.sendDocuments({
                    value: gif.zoomer,
                    filename: 'zoomer.gif'
                })
            }
            break
        }
        case '!текущиенубасы':{
            let str = ''
            tagId.forEach(elem => str += `${elem} `)
            msg.send(`Текущие нубасы: ${str}`)
            break
        }
        // case 'vej': case 'расскажи шутку': case 'пошути':{
        //     msg.sendAudioMessage({
        //         // value: './joke.ogg',
        //         // filename: 'joke.mp3',
        //         // contentType: 'audio/mp3',
        //         // contentLength: fs.statSync('./joke.ogg').size
        //         // value: 'https://psv4.userapi.com/s/v1/amsg/gl7L80I6hNa-PwigBh4LUlAISysZN03odd_4Hn5MMnQTSnsG4CX4fcIOmmZcXCfc_rRx.ogg'
        //     })
        //     break
        // }
    }
})
console.log('done')
bot.updates.start().catch(console.error)