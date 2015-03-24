SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`Element`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `mydb`.`Element` (
  `Id` INT(11) NOT NULL ,
  `Name` TEXT NOT NULL ,
  `Description` TEXT NULL ,
  `Image` TEXT NULL ,
  PRIMARY KEY (`Id`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Recipe`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `mydb`.`Recipe` (
  `Id` INT(11) NOT NULL ,
  `Element1Id` INT(11) NOT NULL ,
  `Element2Id` INT(11) NOT NULL ,
  `ResultId` INT(11) NOT NULL ,
  `EnegryUsage` INT(11) NOT NULL ,
  PRIMARY KEY (`Id`) ,
  INDEX `fk_Recipe_Element_idx` (`Element1Id` ASC) ,
  INDEX `fk_Recipe_Element1_idx` (`Element2Id` ASC) ,
  INDEX `fk_Recipe_Element2_idx` (`ResultId` ASC) ,
  CONSTRAINT `fk_Recipe_Element`
    FOREIGN KEY (`Element1Id` )
    REFERENCES `mydb`.`Element` (`Id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Recipe_Element1`
    FOREIGN KEY (`Element2Id` )
    REFERENCES `mydb`.`Element` (`Id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Recipe_Element2`
    FOREIGN KEY (`ResultId` )
    REFERENCES `mydb`.`Element` (`Id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Achievement`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `mydb`.`Achievement` (
  `Id` INT(11) NOT NULL ,
  `Name` TEXT NOT NULL ,
  `Description` TEXT NOT NULL ,
  `Image` TEXT NOT NULL ,
  `Query` TEXT NOT NULL ,
  PRIMARY KEY (`Id`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Player`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `mydb`.`Player` (
  `Id` INT(11) NOT NULL ,
  `CurrentEnergy` INT(11) NOT NULL ,
  PRIMARY KEY (`Id`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`CurrentElement`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `mydb`.`CurrentElement` (
  `Id` INT(11) NOT NULL ,
  `PlayerId` INT(11) NOT NULL ,
  `ElementId` INT(11) NOT NULL ,
  `Location` TEXT NOT NULL COMMENT 'Json String' ,
  INDEX `fk_CurrentElement_Player1_idx` (`PlayerId` ASC) ,
  INDEX `fk_CurrentElement_Element1_idx` (`ElementId` ASC) ,
  PRIMARY KEY (`Id`) ,
  CONSTRAINT `fk_CurrentElement_Player1`
    FOREIGN KEY (`PlayerId` )
    REFERENCES `mydb`.`Player` (`Id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_CurrentElement_Element1`
    FOREIGN KEY (`ElementId` )
    REFERENCES `mydb`.`Element` (`Id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`UnlockedAchievement`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `mydb`.`UnlockedAchievement` (
  `Id` INT(11) NOT NULL ,
  `PlayerId` INT(11) NOT NULL ,
  `AchievementId` INT(11) NOT NULL ,
  PRIMARY KEY (`Id`) ,
  INDEX `fk_UnlockedAchievement_Player1_idx` (`PlayerId` ASC) ,
  INDEX `fk_UnlockedAchievement_Achievement1_idx` (`AchievementId` ASC) ,
  CONSTRAINT `fk_UnlockedAchievement_Player1`
    FOREIGN KEY (`PlayerId` )
    REFERENCES `mydb`.`Player` (`Id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_UnlockedAchievement_Achievement1`
    FOREIGN KEY (`AchievementId` )
    REFERENCES `mydb`.`Achievement` (`Id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`UnlockedRecipe`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `mydb`.`UnlockedRecipe` (
  `Id` INT(11) NOT NULL ,
  `PlayerId` INT(11) NOT NULL ,
  `RecipeId` INT(11) NOT NULL ,
  PRIMARY KEY (`Id`) ,
  INDEX `fk_UnlockedRecipe_Player1_idx` (`PlayerId` ASC) ,
  INDEX `fk_UnlockedRecipe_Recipe1_idx` (`RecipeId` ASC) ,
  CONSTRAINT `fk_UnlockedRecipe_Player1`
    FOREIGN KEY (`PlayerId` )
    REFERENCES `mydb`.`Player` (`Id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_UnlockedRecipe_Recipe1`
    FOREIGN KEY (`RecipeId` )
    REFERENCES `mydb`.`Recipe` (`Id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

USE `mydb` ;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
