
from flask import Flask, jsonify, request
import yfinance as yf
from flask_cors import CORS
import pandas as pd


app = Flask(__name__)
CORS(app)

@app.route('/stock/<ticker>', methods=['GET'])
def get_stock_data(ticker):
    try:
        interval = request.args.get('interval')
        stock = yf.Ticker(ticker)
        data = stock.history(period='1d', interval=interval)  # Fetches data for the latest day
        response = {
            "ticker": ticker,
            "data": data.reset_index().to_dict('records')  # Reset index to include date in the response
        }
        return jsonify(response), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/stocks/latest/', methods=['GET'])
def get_stocks_data():
    try:
        # Get query parameter for tickers
        tickers = request.args.get('tickers')
        
        if not tickers:
            return jsonify({"error": "The 'tickers' query parameter is required."}), 400

        tickers_list = tickers.split(',')
        response = {}
        
        for ticker in tickers_list:
            try:
                stock = yf.Ticker(ticker.strip())
                data = stock.history(period='1d')  # Fetches data for the latest day
                response[ticker] = data.reset_index().to_dict('records')
            except Exception as e:
                response[ticker] = {"error": str(e)}
        
        return jsonify(response), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500



@app.route('/stock/date-range/<ticker>', methods=['GET'])
def get_stock_data_by_date_range(ticker):
    try:
        # Get query parameters for start and end dates
        start_date = request.args.get('start')
        end_date = request.args.get('end')
        
        if not start_date or not end_date:
            return jsonify({"error": "Both 'start' and 'end' query parameters are required."}), 400

        # Fetch stock data using yfinance
        stock = yf.Ticker(ticker)
        data = stock.history(start=start_date, end=end_date)
        
        # Convert data to a list of dictionaries
        response = {
            "ticker": ticker,
            "data": data.reset_index().to_dict('records')  # Reset index to include date in the response
        }
        return jsonify(response), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/stocks/date-range/', methods=['GET'])
def get_stocks_data_by_date_range():
    try:
        # Get query parameters for tickers, start, and end dates
        tickers = request.args.get('tickers')
        start_date = request.args.get('start')
        end_date = request.args.get('end')
        
        if not tickers or not start_date or not end_date:
            return jsonify({"error": "Parameters 'tickers', 'start', and 'end' are required."}), 400

        tickers_list = tickers.split(',')
        response = {}
        
        for ticker in tickers_list:
            try:
                stock = yf.Ticker(ticker.strip())
                data = stock.history(start=start_date, end=end_date)
                response[ticker] = data.reset_index().to_dict('records')
            except Exception as e:
                response[ticker] = {"error": str(e)}
        
        return jsonify(response), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/stock/latest-price/<ticker>', methods=['GET'])
def get_latest_price(ticker):
    try:
        stock = yf.Ticker(ticker)
        # Fetch real-time market data
        stock_info = stock.info
        # Extract the current price from the stock info
        latest_price = stock_info.get('last_price', 'No price available')  # Example key; actual key may differ
        if latest_price == 'No price available':
            # Alternative: try to get the current price from a more accurate field if available
            latest_price = stock_info.get('regularMarketPrice', 'No price available')
        response = {
            "ticker": ticker,
            "latest_price": latest_price
        }
        return jsonify(response), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/stocks/latest-prices/', methods=['GET'])
def get_latest_prices():
    try:
        # Get query parameter for tickers
        tickers = request.args.get('tickers')
        
        if not tickers:
            return jsonify({"error": "The 'tickers' query parameter is required."}), 400

        tickers_list = tickers.split(',')
        response = {}
        
        for ticker in tickers_list:
            ticker = ticker.strip()
            try:
                stock = yf.Ticker(ticker)
                stock_info = stock.info
                # Extract the current price from the stock info
                latest_price = stock_info.get('last_price', 'No price available')  # Example key; actual key may differ
                if latest_price == 'No price available':
                    # Alternative: try to get the current price from a more accurate field if available
                    latest_price = stock_info.get('regularMarketPrice', 'No price available')
                response[ticker] = {"latest_price": latest_price}
            except Exception as e:
                response[ticker] = {"error": str(e)}
        
        return jsonify(response), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/stock/minute-data/', methods=['GET'])
def get_minute_data():
    try:
        ticker = request.args.get('ticker')
        start_date = request.args.get('start')
        end_date = request.args.get('end')
        
        if not ticker or not start_date or not end_date:
            return jsonify({"error": "Parameters 'ticker', 'start', and 'end' are required."}), 400

        # Fetch minute-level stock data using yfinance
        stock = yf.Ticker(ticker)
        data = stock.history(start=start_date, end=end_date, interval='1m')
        
        # Convert data to a list of dictionaries
        response = {
            "ticker": ticker,
            "data": data.reset_index().to_dict('records')  # Reset index to include date in the response
        }
        return jsonify(response), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/stock/latest-news/<ticker>', methods=['GET'])
def get_latest_news(ticker):
    try:
        stock = yf.Ticker(ticker)
        news = stock.news  # Fetch latest news
        response = {
            "ticker": ticker,
            "news": news
        }
        return jsonify(response), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/stocks/latest-news/', methods=['GET'])
def get_latest_news_multiple():
    try:
        # Get query parameter for tickers
        tickers = request.args.get('tickers')
        
        if not tickers:
            return jsonify({"error": "The 'tickers' query parameter is required."}), 400

        tickers_list = tickers.split(',')
        response = {}
        
        for ticker in tickers_list:
            ticker = ticker.strip()
            try:
                stock = yf.Ticker(ticker)
                news = stock.news  # Fetch latest news
                response[ticker] = {"news": news}
            except Exception as e:
                response[ticker] = {"error": str(e)}
        
        return jsonify(response), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(port=8080, debug=True)
