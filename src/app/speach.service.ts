import { Injectable } from '@angular/core';

@Injectable()
export class SpeachService {

  recognition:any;
  constructor() {
    this.recognition = new (window['SpeechRecognition'] || window['webkitSpeechRecognition'] || window['mozSpeechRecognition'] || window['msSpeechRecognition'])();
    this.recognition.lang = 'en-GB';
    this.recognition.maxAlternatives = 1;
    this.recognition.continuous = true;
    this.recognition.interimResults = false;
  }
  
  say(message){
    //updates the text to say
    return message;
  }
  
  stopListening(){
    this.recognition.abort();
  }

  accurateResult(bool:boolean = false){
    this.recognition.continuous = bool;
  }
  quickResult(bool:boolean = false){
    this.recognition.interimResults = bool;
  }

  ask(){
    this.recognition.abort();
    setTimeout(()=>{
      this.recognition.start();
      console.log('starting speach recognition.')
    },800)

    let questionAnswered = false;
    return new Promise(resolve=>{
      
      this.recognition.onresult = event=> {
          console.log('You said: ', event.results[0][0].transcript);
          let speech = event.results[0][0].transcript;
          resolve(speech);
          console.log('stopping speech recognition')
          this.recognition.stop();
      };

      this.recognition.onerror = event=>{
        this.recognition.stop();
        this.recognition.abort();
        console.log('Recognition crashed')
        console.log(event)
        setTimeout(()=>{
          this.recognition.start();
        },1000)
        throw event;
      }

      this.recognition.onnomatch = event=>{
        this.recognition.stop();
        this.recognition.abort();
        setTimeout(()=>{
          this.recognition.start();
        },300)
      }

      this.recognition.onsoundend = event=>{
        console.log('end sound')
      }
      this.recognition.onend = event=>{
        console.log('disconnect')
      }

    })
    .catch(err=>{
      console.log(err)
    });

  }

}
