pub mod error;

use axum::{Router, routing::get, http::StatusCode, debug_handler, Json};
use error::ApiError;
use k8s_openapi::api::apps::v1::Deployment;
use kube::{Client, Api};
use serde::Serialize;

#[tokio::main]
async fn main() {
    let app = Router::new()
        .route("/", get("Hello World"))
        .route("/apps", get(get_apps));
    
    let listener = tokio::net::TcpListener::bind("127.0.0.1:8080")
        .await
        .unwrap();
    
    println!("listening on {}", listener.local_addr().unwrap());
    axum::serve(listener, app).await.unwrap();
}

#[debug_handler]
pub async fn get_apps() -> Result<(StatusCode, Json<Vec<DeploymentStruct>>), ApiError> {
    let client = Client::try_default().await.map_err(|err| ApiError { status_code: StatusCode::FORBIDDEN, message: err.to_string() })?;

    let deployments: Api<Deployment> = Api::default_namespaced(client);
    let deployment_list = deployments.list(&Default::default()).await.map_err(|err| ApiError { status_code: StatusCode::FORBIDDEN, message: err.to_string() })?;

    let mut deployment_object_list: Vec<DeploymentStruct> = Vec::new();
    let _var_name = for deployment in deployment_list {
        let metadata = deployment.metadata;
        let name = metadata.name.unwrap();

        let spec = deployment.spec.unwrap();
        let container = spec.template.spec.unwrap().containers[0].to_owned();
        let image = container.image.unwrap();

        let port: i32 = container.ports.unwrap()[0].container_port;

        let object = DeploymentStruct {
            name, image, port,
        };

        deployment_object_list.push(object)
    };

    Ok((StatusCode::OK, Json(deployment_object_list)))
}

#[derive(Serialize)]
pub struct DeploymentStruct {
    name: String,
    image: String,
    port: i32,
}
