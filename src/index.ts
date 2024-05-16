import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import {WebSocket} from 'ws';

interface StockData {
    ticker: number;
    time: Date;
    low: number;
    high: number;
    open: number;
    close: number;
    volume: number;
}

interface ArticleData {
  url: string;
  date: Date;
  time: string;
  title: string;
  ticker: string;
  articleText: string;
  summary: string;
  image: string;
}


// Use you own api url ------------------------------>
const infura_ws_url = 'wss://polygon-mainnet.infura.io/ws/v3/<YOUR_API_KEY>';
const wss = new WebSocket(infura_ws_url);
// Use you own model or where from your news is coming --------->
const news = new WebSocket('wss://ws.finnhub.io?')


Promise.all([
  new Promise((resolve, reject) => {
    wss.on('open', resolve);
    wss.on('error', reject);
  }),
  new Promise((resolve, reject) => {
    news.on('open', resolve);
    news.on('error', reject);
  }),
]).then(() => {
  console.log('Both WebSocket connections are open');
}).catch((error) => {
  console.error('Error opening WebSocket connection', error);
});


wss.on('connection', function connection(ws) {

   // First it will authenciate with the api server 
   ws.on('open',function Authenciate(){
    const message  = {
      // Have your own credentials ------------------------------->
      "action":"auth",
      "params":"YK7lNIBBl5XWHkINFgcltq8_hx2Uf7py"
    }
    ws.send(message);
  });

  ws.on('open',function Subscribe(){

    // Subscring all the ticker data per second from the polygon api -------->
    const message  = {
      "action":"subscribe",
      "params":"A.*"
    }
    
    ws.send(message);

  });

  ws.on('error',console.error);
  
  // Then we will demand for the data by subscribing to it -------->
  ws.on('message', function incoming(data : StockData) => {
      InsertStockData(data);
  });

}
);


news.on('connection', function connection(ws) {
       
   ws.on('message', function incoming(data : ArticleData) {

   });

});



async function InsertStockData(data: StockData) : Promise<void | null> {
    const res = await prisma.stock.create({
      data: {
          ticker: data.ticker,
          time: data.time,
          low: data.low,
          high: data.high,
          open: data.open,
          close: data.close,
          volume: data.volume,
      },
    });
}

