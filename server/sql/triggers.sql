CREATE OR REPLACE FUNCTION number_of_vans_as_usual() RETURNS TRIGGER AS
$BODY$
	BEGIN
		NEW.number_of_vans = 10;
		RETURN NEW;
	END;
$BODY$
LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER "_trigger_number_of_vans_as_usual_"
	BEFORE INSERT ON trains
	FOR EACH ROW
		EXECUTE PROCEDURE "number_of_vans_as_usual"();

DROP TRIGGER _trigger_number_of_vans_as_usual_ ON trains;