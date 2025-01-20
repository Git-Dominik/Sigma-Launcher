use toml;
use std::{fs::{self, File}, io::{Read, Write}};
use serde::{Serialize, Deserialize};

// public = gebruik van buitenaf bestand

#[derive(Serialize, Deserialize)]
pub struct LibraryItem {
    pub name: String,
    pub igdb_id: u32,
}

#[derive(Serialize, Deserialize)]
pub struct LibraryFile {
    items: Vec<LibraryItem>,
}

pub struct Library {
    file: LibraryFile,
}

impl Library {
    pub fn new() -> Library {
        match fs::exists("library.toml") {
            Ok(true) => {
                let mut file = File::open("library.toml").unwrap();
                let mut file_content = String::new();
                file.read_to_string(&mut file_content).unwrap();

                Library {
                    file: toml::from_str(&file_content).unwrap()
                }
            },
            Ok(false) => {
                let toml_string = toml::to_string(&LibraryFile {
                    items: Vec::new(),
                }).unwrap();

                let mut file = File::create("library.toml").unwrap();
                file.write_all(toml_string.as_bytes()).unwrap();

                Library {
                    file: LibraryFile {
                        items: Vec::new(),
                    }
                }
            },
            Err(e) => panic!("Error: {}", e),
        }
    }

    pub fn add(&mut self, item: LibraryItem) {
        self.file.items.push(item);
        self.save();
    }

    pub fn remove(&mut self, name: String) {
        self.file.items.retain(|item| item.name != name);
        self.save();
    }

    fn save(&self) {
        let mut file = File::open("library.toml").unwrap();
        let data = toml::to_string(&self.file).unwrap();
        file.write_all(data.as_bytes()).unwrap();
    }
}