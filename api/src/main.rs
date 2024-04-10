pub mod error;

use axum::{Router, routing::get, http::{StatusCode, uri}, debug_handler};
use error::ApiError;
use k8s_openapi::api::apps::v1::Deployment;
use kube::{Client, Api, ResourceExt, Config};
use serde::Serialize;
use http::Uri;

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

pub async fn get_deployments() -> Result<(StatusCode, String), ApiError> {
    let client = Client::try_default().await.map_err(|err| ApiError { status_code: StatusCode::FORBIDDEN, message: err.to_string() })?;

    let deployments: Api<Deployment> = Api::all(client);
    let deployment_list = deployments.list(&Default::default()).await?;

    let mut deployment_names = Vec::new();
    for deployment in deployment_list {
        if let Some(metadata) = deployment.metadata {
            if let Some(name) = metadata.name {
                deployment_names.push(name);
            }
        }
    }

    Ok((StatusCode::OK, "test".to_string()))
}

//#[derive(Serialize)]
//struct Deployment {
//    name: String,
//    image: String,
//    port: String,
//}

//struct Ingress {
//    name: String,
//    hosts: vec![String],
//}