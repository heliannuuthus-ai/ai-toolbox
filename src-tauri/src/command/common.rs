use mime_guess::from_path;
use tauri::Theme;
#[tauri::command]
pub async fn guess_mime_type(_app: tauri::AppHandle, path: String) -> Result<String, String> {
    let mime_type = from_path(path).first_or_octet_stream();
    Ok(mime_type.to_string())
}

#[tauri::command]
pub async fn set_theme(app: tauri::AppHandle, theme: Theme) -> Result<(), String> {
    app.set_theme(Some(theme));
    Ok(())
}
