use std::fmt::Result;

use axum::{Router, routing::get, http::StatusCode};
use serde::Serialize;

#[tokio::main]
async fn main() {
    let app = Router::new()
        .route("/", get("Hello World"));
    
    let listener = tokio::net::TcpListener::bind("127.0.0.1:8080")
        .await
        .unwrap();
    
    println!("listening on {}", listener.local_addr().unwrap());
    axum::serve(listener, app).await.unwrap();
}

async fn get_deployments() -> Result<(StatusCode, vec![Deployment]), StatusCode> {

}

#[derive(Serialize)]
struct Deployment {
    name: String,
    image: String,
    port: String,
}

struct Ingress {
    name: String,
    hosts: vec![String],
}