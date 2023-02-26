import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root' 
})
export class SummarizeService {

  API_KEY:string = "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";

  private openaiUrl = 'https://api.openai.com/v1/completions';
  http:HttpClient;
  constructor(http:HttpClient) {
    this.http = http;
   }

  public getSummary(prompt:string):Observable<any>{
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${this.API_KEY}`);
    let requestBody = {
      "model": "text-davinci-003",
      "prompt": prompt,
      "temperature": 0.6,
      "max_tokens": 400,
      "top_p": 1,
      "frequency_penalty": 1,
      "presence_penalty": 1
    }
    return this.http.post(this.openaiUrl,requestBody, { headers: headers });
  }
}
