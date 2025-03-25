use mime_guess::from_path;

#[tauri::command]
pub async fn guess_mime_type(path: String) -> Result<String, String> {
    let mime_type = from_path(path).first_or_octet_stream();
    Ok(mime_type.to_string())
}
