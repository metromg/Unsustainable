

-- -----------------------------------------------------
-- Table Element
-- -----------------------------------------------------
CREATE  TABLE Element (
  Id INTEGER PRIMARY KEY ,
  Name TEXT NOT NULL ,
  Description TEXT NULL ,
  Image TEXT NULL
);


-- -----------------------------------------------------
-- Table Recipe
-- -----------------------------------------------------
CREATE  TABLE Recipe (
  Id INTEGER PRIMARY KEY ,
  Element1Id INTEGER NOT NULL ,
  Element2Id INTEGER NOT NULL ,
  ResultId INTEGER NOT NULL ,
  EnegryUsage INTEGER NOT NULL ,
  CONSTRAINT fk_Recipe_Element
    FOREIGN KEY (Element1Id )
    REFERENCES Element (Id ),
  CONSTRAINT fk_Recipe_Element1
    FOREIGN KEY (Element2Id )
    REFERENCES Element (Id ),
  CONSTRAINT fk_Recipe_Element2
    FOREIGN KEY (ResultId )
    REFERENCES Element (Id )
);


-- -----------------------------------------------------
-- Table Achievement
-- -----------------------------------------------------
CREATE  TABLE Achievement (
  Id INTEGER PRIMARY KEY ,
  Name TEXT NOT NULL ,
  Description TEXT NOT NULL ,
  Image TEXT NOT NULL ,
  Query TEXT NOT NULL
);


-- -----------------------------------------------------
-- Table Player
-- -----------------------------------------------------
CREATE  TABLE Player (
  Id INTEGER PRIMARY KEY ,
  CurrentEnergy INTEGER NOT NULL 
);


-- -----------------------------------------------------
-- Table CurrentElement
-- -----------------------------------------------------
CREATE  TABLE CurrentElement (
  Id INTEGER PRIMARY KEY,
  PlayerId INTEGER NOT NULL ,
  ElementId INTEGER NOT NULL ,
  Location TEXT NOT NULL COMMENT 'Json String' ,
  CONSTRAINT fk_CurrentElement_Player1
    FOREIGN KEY (PlayerId )
    REFERENCES Player (Id ),
  CONSTRAINT fk_CurrentElement_Element1
    FOREIGN KEY (ElementId )
    REFERENCES Element (Id )    
);


-- -----------------------------------------------------
-- Table UnlockedAchievement
-- -----------------------------------------------------
CREATE  TABLE UnlockedAchievement (
  Id INTEGER PRIMARY KEY ,
  PlayerId INTEGER NOT NULL ,
  AchievementId INTEGER NOT NULL ,
  CONSTRAINT fk_UnlockedAchievement_Player1
    FOREIGN KEY (PlayerId )
    REFERENCES Player (Id )
    
    ,
  CONSTRAINT fk_UnlockedAchievement_Achievement1
    FOREIGN KEY (AchievementId )
    REFERENCES Achievement (Id )   
);


-- -----------------------------------------------------
-- Table UnlockedRecipe
-- -----------------------------------------------------
CREATE  TABLE UnlockedRecipe (
  Id INTEGER PRIMARY KEY,
  PlayerId INTEGER NOT NULL ,
  RecipeId INTEGER NOT NULL ,
  CONSTRAINT fk_UnlockedRecipe_Player1
    FOREIGN KEY (PlayerId)
    REFERENCES Player (Id),
  CONSTRAINT fk_UnlockedRecipe_Recipe1
    FOREIGN KEY (RecipeId)
    REFERENCES Recipe (Id)
);


