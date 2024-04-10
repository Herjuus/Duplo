use axum::{Router, routing::get, http::StatusCode};
use k8s_openapi::api::core::v1::Pod;
use kube::{Client, Api};
use serde::Serialize;

#[tokio::main]
async fn main() {
    let app = Router::new()
        .route("/", get("Hello World"))
        .route("/pods", get(get_deployments));
    
    let listener = tokio::net::TcpListener::bind("127.0.0.1:8080")
        .await
        .unwrap();
    
    println!("listening on {}", listener.local_addr().unwrap());
    axum::serve(listener, app).await.unwrap();
}

async fn get_deployments() -> Result<(StatusCode, Pod), StatusCode> {
    let client = Client::try_default().await.map_err(|_e| StatusCode::FORBIDDEN)?;

    let pods: Api<Pod> = Api::all(client);
    let pod = pods.get("nginx-deployment-7c5ddbdf54-g8rkr").await.map_err(|_e| StatusCode::FORBIDDEN)?;

    Ok((StatusCode::OK, pod))
}

#[derive(Serialize)]
struct Deployment {
    name: String,
    image: String,
    port: String,
}

//struct Ingress {
//    name: String,
//    hosts: vec![String],
//}