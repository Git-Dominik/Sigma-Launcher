#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod library;

use library::Library;

// dingen die handig zijn om te weten:
// 
// rust heeft geen "return" laatste value word teruggegeven (geen ;)
// rust heeft geen null of nil, maar Option<Type> (Some, None)
// met rust doe je errors als een Result<T, E> (Ok, Err)

fn main() {
    let mut lib = Library::new();

    lib.add(library::LibraryItem {
        name: "test".to_string(),
        igdb_id: 123,
    });

    lib.remove("test".to_string());

    sigma_launcher_lib::run();
}
