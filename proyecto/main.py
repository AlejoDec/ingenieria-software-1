import uvicorn

def app():
    uvicorn.run(
        "Application.ApiChatBot:app",
        host="127.0.0.1",
        port=8030,
        reload=True
    )
    
if __name__ == "__main__":
    app()
