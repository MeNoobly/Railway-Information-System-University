-- реализует механику "золотого билета", когда покупается 10й билет, его стоимость приравнивается к 1
CREATE OR REPLACE FUNCTION generate_code() RETURNS TRIGGER AS
$BODY$
	BEGIN
		IF NEW.ticket_id % 10 = 0 THEN
			NEW.code = 'GOLDEN_TICKET';
			NEW.PRICE = 1.0;
		ELSE
			NEW.code = 'default_ticket';
		END IF;
		RETURN NEW;
	END;
$BODY$
LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER "generate_code_trigger"
	BEFORE INSERT ON tickets
	FOR EACH ROW
		EXECUTE PROCEDURE "generate_code"();

DROP TRIGGER generate_code_trigger ON tickets;